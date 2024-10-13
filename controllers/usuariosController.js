import usuariosModel from "../model/usuariosModel.js";
import userSchema from "../schemas/usuariosSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registrarUsuario = async (req, res) => {
    try {

        const { error } = userSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            return res.status(400).json({ errors: errorMessages });
        }

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


export const usuariosLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send("los campos son obligatorios")

        const usuario = await usuariosModel.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ message: "El usuario no está registrado" });
        }


        const validPassword = await bcrypt.compare(password, usuario.password)
        if (!validPassword) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });



        res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al logear el usuario', error });
    }
}


export const obtenerUsuario = async (req, res) => {
    try {
        const usuarioId = req.user.id; // Aquí está correcto si el token contiene `id`

        // O si has guardado `_id` en el token, deberías usar:
        // const usuarioId = req.user._id; 

        const usuario = await usuariosModel.findById(usuarioId, '-password');

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};