import Joi from 'joi';

const protagonistaSchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required()
        .messages({
            'string.empty': 'El nombre es obligatorio.',
            'string.min': 'El nombre debe tener al menos 2 caracteres.',
            'string.max': 'El nombre no puede tener más de 100 caracteres.'
        }),
    edad: Joi.number().integer().min(0).max(120).required()
        .messages({
            'number.base': 'La edad debe ser un número.',
            'number.min': 'La edad no puede ser negativa.',
            'number.max': 'La edad no puede ser mayor de 120.',
            'any.required': 'La edad es obligatoria.'
        }),
    genero: Joi.string().valid('Masculino', 'Femenino', 'Otro').required()
        .messages({
            'any.only': 'El género debe ser Masculino, Femenino o Otro.',
            'any.required': 'El género es obligatorio.'
        }),
    juegos: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)).min(1).required()
        .messages({
            'array.base': 'Juegos debe ser un arreglo.',
            'array.min': 'Debe haber al menos un juego asociado.',
            'string.pattern.base': 'Cada identificador de juego debe ser un ID de MongoDB válido.',
            'any.required': 'El campo juegos es obligatorio.'
        })
});

export default protagonistaSchema;
