import { useState, useEffect } from "react";

import NoteService from "../NoteService";
import "./style.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const CreateNoteContainer = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);



  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("hhhhh");
    try {
      const newNote = await NoteService.addNote(title, content);
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) return;

    try {
      const updatedNote = await NoteService.updateNote(
        selectedNote.id,
        title,
        content
      );
      const updatedNotesList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );
      setNotes(updatedNotesList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {
      await NoteService.deleteNote(noteId);
      const updatedNote = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNote);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create__note__container">
      <h2>Add a new Note</h2>
      <div className="create__note__wrapper">
        <input
          type="text"
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Take a note..."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="btn__wrapper">
        <button type="submit" className="btn add__note" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default CreateNoteContainer;
