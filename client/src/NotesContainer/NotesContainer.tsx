import { useEffect, useState } from "react";
import NoteIcon from "../icons/NoteIcon";
import NoteCard from "../noteCard/NoteCard";

import "./style.css";
import NoteService from "../NoteService";

type Note = {
  id: number;
  title: string;
  content: string;
};

export const NotesContainer = () => {
  const [notes, setNotes] = useState<Note[]>([]);

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


  console.log(notes)

  return (
    <div className="notes__container">
      <div className="notes__header">
        <NoteIcon />
        <span>My Notes</span>
      </div>
      <div className="notes__wrapper">
        {notes.map((note) => (
          <NoteCard note={note} />
        ))}
      </div>
    </div>
  );
};
