import protagonistasModel from "../model/protagonistasModel.js";
import protagonistaSchema from "../schemas/protagonistasSchema.js";
protagonistaSchema


export const getprotagonistas = async (req, res) => {
    try {
        const protagonistas = await protagonistasModel.find().populate("juegos");
        res.json(protagonistas)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

export const createprotagonistas = async(req,res) =>{
    try {

        const { error } = protagonistaSchema.validate(req.body, { abortEarly: false });
        if (error) {
            // Mapeamos los mensajes de error y los devolvemos
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }



        const protagonista = new protagonistasModel({...req.body})
        const newprotagonista = await protagonista.save()
        res.status(201).json(newprotagonista);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const getProtagonistasById = async(req,res) =>{
    try {
        const protagonista = await protagonistasModel.findById(req.params.id).populate("juegos");
        if(!protagonista) return res.status(400).json({error:"not found"})
        res.json(protagonista);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const updateProtagonistas = async(req,res) =>{
    try {
        const updated = await protagonistasModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(updated);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const deleteProtagonistas = async(req,res) =>{
    try {
        const deleted = await protagonistasModel.findByIdAndDelete(req.params.id)
        res.json(deleted);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}