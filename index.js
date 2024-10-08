import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cursosRouters from "./routes/cursosRoutes.js"
import estudiantesRouters from "./routes/estudiantesRoutes.js"

dotenv.config()

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("conexion exitosa con mongodb!"))
.catch((err) => console.error("error al conectar con mongodb!",err))
app.use(express.json());

app.use("/juegos",juegosRouters)
app.use("/protagonistas",protagonistasRouters)

app.listen(port,() => console.log(`https://localhost:${port}`));