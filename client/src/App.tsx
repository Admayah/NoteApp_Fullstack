import { useState, useEffect } from "react";
import NoteService from "./NoteService";

import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App: React.FC = () => {

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await NoteService.fetchNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

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

    if (!selectedNote) return
    
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
    <div className="app-container">
      <form
        action=""
        className="note-form"
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
        <input
          type="text"
          required
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={10}
          placeholder="Content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
