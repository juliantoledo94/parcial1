import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token del encabezado

    if (!token) {
        return res.status(403).json({ message: "Se requiere autenticación" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
        
        req.user = decoded; // Almacena la información del usuario en la solicitud
        next();
    });
};


export default authMiddleware;