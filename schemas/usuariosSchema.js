import Joi from 'joi';

const userSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'Debe ser un email válido'
    }),
    password: Joi.string().min(4).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos 4 caracteres'
    })
});

export default userSchema;
