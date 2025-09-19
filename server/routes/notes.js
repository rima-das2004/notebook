const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Note = require("../models/Note");

// POST /api/notes -> create
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ msg: "Title is required" });
  try {
    const note = new Note({ user: req.user.id, title, description });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// GET /api/notes -> get all for user
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// PUT /api/notes/:id -> update
router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE /api/notes/:id -> delete
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: "Not authorized" });

    await note.remove();
    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
