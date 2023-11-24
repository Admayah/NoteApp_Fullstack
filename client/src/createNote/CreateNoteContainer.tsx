import React, { useState, useEffect } from "react";
import NoteService from "../NoteService";
import "./style.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const CreateNoteContainer = ({ onCreate, initialNote, setNotes }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setContent(initialNote.content);
      setSelectedNote(initialNote);
    }
  }, [initialNote]);
  

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newNote = await NoteService.addNote(title, content);
      onCreate(newNote); // Trigger the callback to update the parent state
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
      // Update only the selected note in the notes state
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === selectedNote.id ? { ...note, ...updatedNote } : note
        )
      );
      //   onCreate(updatedNote); // Trigger the callback to update the parent state
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

  return (
    <div className="create__note__container">
      <h2>{initialNote ? "Update Note" : "Add a new Note"}</h2>
      <form
        onSubmit={(event) =>
          selectedNote ? handleUpdateNote(event) : handleAddNote(event)
        }
      >
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
          <button type="submit" className="btn add__note">
            {selectedNote !== null ? "Update" : "Create Note"}
          </button>
          {selectedNote !== null && (
            <button className="btn" onClick={handleCancel}>
              {initialNote && "Cancel"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateNoteContainer;
