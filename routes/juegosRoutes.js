import express from "express";
import { createJuegos, deleteJuegos, getJuegos, getJuegosById, searchByName, searchByTag, searchByYear, updateJuegos } from "../controllers/juegosController.js";


const router = express.Router();

router.post("/",createJuegos);
router.get("/",getJuegos);
router.get(":id",getJuegosById);
router.put("/:id",updateJuegos)
router.delete("/:id",deleteJuegos)
router.get("/search/tags", searchByTag);
router.get("/search/year", searchByYear);
router.get("/search/titulo", searchByName);

export default router;