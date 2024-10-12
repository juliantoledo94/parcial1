import express from "express";
import { obtenerUsuario, registrarUsuario, usuariosLogin } from "../controllers/usuariosController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = express.Router();

router.post("/",registrarUsuario);
router.post("/login",usuariosLogin);
router.get("/logeado",authMiddleware,obtenerUsuario);

export default router;
