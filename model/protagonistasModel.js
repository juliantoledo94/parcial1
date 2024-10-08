/* import { required } from "joi"; */
import mongoose, { Schema } from "mongoose";

const protagonistasSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    edad:{
        type:Number,
        required:true
    },
    genero:{
        type:String,
        required:true
    },
    juegos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'juegos',
        required: true  // Requiere al menos un juego asociado
    }]
    
    
})

export default mongoose.model("protagonistas",protagonistasSchema)