import juegosModel from "../model/juegosModel.js";
import juegoSchema from "../schemas/juegosSchema.js";

export const getJuegos = async (req, res) => {
    try {
        const juegos = await juegosModel.find();
        
        res.status(200).json(juegos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

export const createJuegos = async(req,res) =>{
    try {

        const { error } = juegoSchema.validate(req.body, { abortEarly: false });
        if (error) {
            // Si hay errores de validación, mapeamos los mensajes de error y los devolvemos
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }


        const juego = new juegosModel({...req.body})
        const newJuego = await juego.save()
        res.status(201).json(newJuego);
    } catch (error) {
        res.status(500).json({error: error.message})
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
        res.json(juegos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
export const searchByYear = async (req, res) => {
    try {
       
        const year = req.query.year;
        if (!year) {
            return res.status(400).json({ error: "El parámetro 'year' es obligatorio" });
        }
        if (isNaN(year)) {
            return res.status(400).json({ error: "El año debe ser un número válido" });
        }
        const yearNumber = Number(year);
        const juegos = await juegosModel.find({ year: yearNumber });
        if (juegos.length === 0) {
            return res.status(404).json({ message: "No se encontraron juegos para el año " + yearNumber });
        }
        res.json(juegos);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const searchByName = async (req, res) => {
    try {
       
        const titulo = req.query.titulo;
        if (!titulo) {
            return res.status(400).json({ error: "El parámetro 'titulo' es obligatorio" });
        }
       
        
        const juegos = await juegosModel.find({ titulo: { $regex: titulo, $options: 'i' } });
        if (juegos.length === 0) {
            return res.status(404).json({ message: "No se encontraron juegos con el titulo " + titulo });
        }
        res.json(juegos);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
