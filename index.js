import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import juegosRouters from "./routes/juegosRoutes.js"
import protagonistasRouters from "./routes/protagonistasRoutes.js"

dotenv.config()

const app = express();
const port = 3000;




//VALIDACIONES
//USUARIOS JSONWEBTOKEN



mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("conexion exitosa con mongodb!"))
.catch((err) => console.error("error al conectar con mongodb!",err))
app.use(express.json());


function validateBody(req, res,next){
    if(req.method === "POST" || req.method === "PUT" ){
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({mensaje: "el cuerpo de la solicitud no puede estar vacio."})
        }
    }
    next()
}

app.use(validateBody)

app.use("/juegos",juegosRouters)
app.use("/protagonistas",protagonistasRouters)

app.listen(port,() => console.log(`https://localhost:${port}`));