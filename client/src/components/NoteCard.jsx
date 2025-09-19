import React from "react";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <h4>{note.title}</h4>
      <p style={{ whiteSpace: "pre-wrap" }}>{note.description}</p>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={() => onEdit(note)} className="btn-primary">Edit</button>
        <button onClick={() => onDelete(note._id)} className="btn-danger">Delete</button>
      </div>
    </div>
  );
}
