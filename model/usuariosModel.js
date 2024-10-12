import mongoose, { Schema } from "mongoose";

const usuariosSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
   
    
    
})

export default mongoose.model("usuarios",usuariosSchema)