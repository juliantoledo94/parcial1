import usuariosModel from "../model/usuariosModel.js";
import bcrypt from "bcrypt"

export const registrarUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("los campos son obligatorios")

        const existingUser = await usuariosModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new usuariosModel({
            email,
            password: hashedPassword

        });


        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
}