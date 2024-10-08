/* import { required } from "joi"; */
import mongoose from "mongoose";

const juegosSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    tags:[{type:String}]
    
})

export default mongoose.model("juegos",juegosSchema)