import React, { useState, useEffect } from "react";
import NoteIcon from "../icons/NoteIcon";
import NoteCard from "../noteCard/NoteCard";
import "./style.css";
import NoteService from "../NoteService";
// import CreateNoteContainer from "../createNote/CreateNoteContainer";
import NoteCardSkeleton from "../NoteCardSkeleton/NoteCardSkeleton";
import CreateNoteContainer from "../createNote/CreateNoteContainer";

type Note = {
  id: number;
  title: string;
  content: string;
};

export const NotesContainer = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);

  const editNote = (note) => {
    setSelectedNote(note);
    console.log("lllll");
  };
  console.log(selectedNote);

  const deleteNote = async (noteToDelete) => {
    try {
      await NoteService.deleteNote(noteToDelete.id);
      const filtwerNotes = setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteToDelete.id)
      );
      setSelectedNote(filtwerNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const createNote = async (newNote) => {
    try {
      const createdNote = await NoteService.addNote(
        newNote.title,
        newNote.content
      );
      setNotes((prevNotes) => [createdNote, ...prevNotes]);
      setSelectedNote(null);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const fetchedNotes = await NoteService.fetchNotes();
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  return (
    <>
      {/* <CreateNoteContainer onCreate={createNote} initialNote={selectedNote} setNotes={setNotes} /> */}
      <CreateNoteContainer />
      <div className="notes__container">
        <div className="notes__header">
          <NoteIcon />
          <span>My Notes</span>
        </div>
        <div className="notes__wrapper">
          {loading && <NoteCardSkeleton />}
          {notes.map((note) => (
            <NoteCard
              note={note}
              onEdit={editNote}
              onDelete={deleteNote}
              key={note.id}
              handleNoteClick={handleNoteClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};
