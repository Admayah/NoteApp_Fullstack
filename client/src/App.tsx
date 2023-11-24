import { useState, useEffect } from "react";
import NoteService from "./NoteService";

import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import CreateNoteContainer from "./createNote/CreateNoteContainer";
import NoteCard from "./noteCard/NoteCard";
import { NotesContainer } from "./NotesContainer/NotesContainer";



const App: React.FC = () => {


  return (
    <>
      <Sidebar />
      <div className="a">
        {/* <CreateNoteContainer /> */}
        <NotesContainer />
      </div>
      {/* <div className="app-container">
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
            <div
              key={note.id}
              className="note-item"
              onClick={() => handleNoteClick(note)}
            >
              <div className="notes-header">
                <button onClick={(event) => deleteNote(event, note.id)}>
                  x
                </button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default App;
