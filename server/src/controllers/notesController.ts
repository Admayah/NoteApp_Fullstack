import { Request, Response } from "express";
import prisma from "../db";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await prisma.note.findMany();
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send("Title and content fields required");
  }

  try {
    const note = await prisma.note.create({
      data: { title, content },
    });
    res.json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    return res.status(400).send("Title and content fields required");
  }

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be a valid number");
  }

  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID must be valid integer");
  }

  try {
    await prisma.note.delete({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("Internal Server Error");
  }
};
