import React, { useEffect, useState } from "react";
import api from "../api/api";
import NoteCard from "../components/NoteCard";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createNote = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title) return setError("Title is required");
    try {
      if (editing) {
        await api.put(`/notes/${editing._id}`, form);
        setEditing(null);
      } else {
        await api.post("/notes", form);
      }
      setForm({ title: "", description: "" });
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.msg || "Operation failed");
    }
  };

  const handleEdit = (note) => {
    setEditing(note);
    setForm({ title: note.title, description: note.description });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => { setEditing(null); setForm({ title: "", description: "" }); };

  return (
    <div>
      <h2>Your Notes</h2>

      <form onSubmit={createNote}>
        <input name="title" placeholder="Title" value={form.title} onChange={onChange} />
        <textarea name="description" rows={4} placeholder="Description" value={form.description} onChange={onChange} />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit" className="btn-primary">{editing ? "Update Note" : "Add Note"}</button>
          {editing && <button type="button" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr style={{ margin: "16px 0" }} />

      <div className="note-grid">
        {notes.length ? notes.map((n) => (
          <NoteCard key={n._id} note={n} onEdit={handleEdit} onDelete={handleDelete} />
        )) : <p>No notes yet. Add one above.</p>}
      </div>
    </div>
  );
}
