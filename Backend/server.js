const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory notes storage
let notes = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

// Create note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
  };

  notes.push(newNote);
  res.json(newNote);
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Update a note
app.put("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  const { title, content } = req.body;

  const noteIndex = notes.findIndex(note => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ error: "Note not found" });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title,
    content
  };

  res.json({
    message: "Note updated successfully",
    note: notes[noteIndex]
  });
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
  const noteId = Number(req.params.id);
  notes = notes.filter(note => note.id !== noteId);
  res.json({ message: "Note deleted successfully" });
});

// Start server (ALWAYS LAST)
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

