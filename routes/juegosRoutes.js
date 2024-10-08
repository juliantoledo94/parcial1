import express from "express";
import { createJuegos, deleteJuegos, getJuegos, getJuegosById, updateJuegos } from "../controllers/juegosController.js";


const router = express.Router();

router.post("/",createJuegos);
router.get("/",getJuegos);
router.get(":id",getJuegosById);
router.put("/:id",updateJuegos)
router.delete("/:id",deleteJuegos)


export default router;