import express from "express";
import { createprotagonistas, deleteProtagonistas, getprotagonistas, getProtagonistasById, updateProtagonistas } from "../controllers/personajesController.js";


const router = express.Router();

router.post("/",createprotagonistas);
router.get("/",getprotagonistas);
router.get("/:id",getProtagonistasById);
router.put("/:id",updateProtagonistas);
router.delete("/:id",deleteProtagonistas);

export default router;