import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { SECTIONS, clean, getComments, addComment, backend } from "./lib/store.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const app = express();
app.use(express.json({ limit: "64kb" }));
app.use(express.static(PUBLIC_DIR));

app.get("/api/comments/:section", async (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.has(section)) return res.status(404).json({ error: "Unknown section" });
  try {
    res.json(await getComments(section));
  } catch {
    res.status(500).json({ error: "Could not read comments" });
  }
});

app.post("/api/comments/:section", async (req, res) => {
  const { section } = req.params;
  if (!SECTIONS.has(section)) return res.status(404).json({ error: "Unknown section" });

  const name = clean(req.body?.name, 60);
  const comment = clean(req.body?.comment, 2000);
  if (!name) return res.status(400).json({ error: "Please add your name." });
  if (!comment) return res.status(400).json({ error: "Please write a comment." });

  try {
    res.status(201).json(await addComment(section, name, comment));
  } catch {
    res.status(500).json({ error: "Could not save comment" });
  }
});

app.listen(PORT, () => {
  console.log(`🏖️  Beach Tour running at http://localhost:${PORT}  (comments: ${backend} backend)`);
});
