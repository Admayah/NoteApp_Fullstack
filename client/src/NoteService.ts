// NoteService.js

const BASE_URL = "http://localhost:4000/api";

type Note = {
  id: number;
  title: string;
  content: string;
};

const NoteService = {
  fetchNotes: async (): Promise<Note[]> => {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const notes: Note[] = await response.json();
      return notes;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  addNote: async (title: string, content: string): Promise<Note> => {
    try {
      const response = await fetch(`${BASE_URL}/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const newNote = await response.json();
      return newNote;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  },

  updateNote: async (
    id: number,
    title: string,
    content: string
  ): Promise<Note> => {
    try {
      const response = await fetch(`${BASE_URL}/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const updatedNote = await response.json();
      return updatedNote;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  },

  deleteNote: async (id: number): Promise<void> => {
    try {
      await fetch(`${BASE_URL}/note/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  },
};

export default NoteService;
