/* ============================================================
   Comment storage — adaptive backend.
   • On Vercel: uses Upstash Redis (via REST) when the env vars are
     present, so comments persist across serverless invocations.
   • Locally / on a disk host: falls back to JSON files in data/comments.
   ============================================================ */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMMENTS_DIR = path.join(__dirname, "..", "data", "comments");

// Vercel KV and Upstash both expose REST URL + token under these names.
const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REST_URL && REST_TOKEN);

export const SECTIONS = new Set([
  "overview",
  "crew",
  "itinerary",
  "connections",
  "route-table",
  "map",
  "beaches",
  "weather",
  "planner",
]);

export function clean(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

export function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* ---------- Redis (Upstash REST) backend ---------- */
async function redis(command) {
  const res = await fetch(REST_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  return (await res.json()).result;
}

/* ---------- File backend ---------- */
function fileFor(section) {
  return path.join(COMMENTS_DIR, `${section}.json`);
}

async function readFile(section) {
  try {
    return JSON.parse(await fs.readFile(fileFor(section), "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

/* ---------- Public API ---------- */
export async function getComments(section) {
  if (useRedis) {
    const rows = await redis(["LRANGE", `comments:${section}`, "0", "-1"]);
    return (rows || []).map((r) => (typeof r === "string" ? JSON.parse(r) : r));
  }
  const data = await readFile(section);
  return Array.isArray(data) ? data : [];
}

export async function addComment(section, name, comment) {
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: escapeHtml(name),
    comment: escapeHtml(comment),
    createdAt: new Date().toISOString(),
  };
  if (useRedis) {
    await redis(["RPUSH", `comments:${section}`, JSON.stringify(entry)]);
  } else {
    await fs.mkdir(COMMENTS_DIR, { recursive: true });
    const list = await readFile(section);
    const arr = Array.isArray(list) ? list : [];
    arr.push(entry);
    await fs.writeFile(fileFor(section), JSON.stringify(arr, null, 2), "utf8");
  }
  return entry;
}

export const backend = useRedis ? "redis" : "file";
