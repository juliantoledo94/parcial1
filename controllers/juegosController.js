import juegosModel from "../model/juegosModel.js";

export const getJuegos = async (req, res) => {
    try {
        const juegos = await juegosModel.find().populate("juegos");
        res.json(juegos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

export const createJuegos = async(req,res) =>{
    try {
        const juego = new juegosModel({...req.body})
        const newJuego = await juego.save()
        res.json(newJuego);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const getJuegosById = async(req,res) =>{
    try {
        const juego = await juegosModel.findById(req.params.id);
        if(!juego) return res.status(400).json({error:"not found"})
        res.json(juego);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const updateJuegos = async(req,res) =>{
    try {
        const updated = await juegosModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(updated);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const deleteJuegos = async(req,res) =>{
    try {
        const deleted = await juegosModel.findByIdAndDelete(req.params.id)
        res.json(deleted);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const searchByTag = async(req,res) =>{
    try {
        const tags = req.query.tags.split(",");
        const juegos = await juegosModel.find({tags:{$in:tags}})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const searchByYear = async(req,res) =>{
    try {
        
    } catch (error) {
        
    }
}