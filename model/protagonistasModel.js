import { required } from "joi";
import mongoose from "mongoose";

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
    }
    
    
})

export default mongoose.model("protagonistas",protagonistasSchema)