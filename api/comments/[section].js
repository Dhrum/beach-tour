import { SECTIONS, clean, getComments, addComment } from "../../lib/store.js";

export default async function handler(req, res) {
  const section = req.query.section;
  if (!SECTIONS.has(section)) {
    return res.status(404).json({ error: "Unknown section" });
  }

  if (req.method === "GET") {
    try {
      return res.status(200).json(await getComments(section));
    } catch {
      return res.status(500).json({ error: "Could not read comments" });
    }
  }

  if (req.method === "POST") {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const name = clean(body.name, 60);
    const comment = clean(body.comment, 2000);
    if (!name) return res.status(400).json({ error: "Please add your name." });
    if (!comment) return res.status(400).json({ error: "Please write a comment." });
    try {
      return res.status(201).json(await addComment(section, name, comment));
    } catch {
      return res.status(500).json({ error: "Could not save comment" });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed" });
}
