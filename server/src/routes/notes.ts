import { Router } from "express";
import * as notesController from "../controllers/notesController";

const router = Router();

router.get("/api/notes", notesController.getNotes);
router.post("/api/notes", notesController.createNote);
router.put("/api/note/:id", notesController.updateNote);
router.delete("/api/note/:id", notesController.deleteNote);

export default router;
