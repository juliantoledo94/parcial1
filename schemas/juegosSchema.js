import Joi from 'joi';

const juegoSchema = Joi.object({
    titulo: Joi.string().required().messages({
        'string.empty': 'El título es obligatorio',
        'any.required': 'El título es obligatorio'
    }),
    descripcion: Joi.string().required().messages({
        'string.empty': 'La descripción es obligatoria',
        'any.required': 'La descripción es obligatoria'
    }),
    year: Joi.number().integer().min(1950).max(new Date().getFullYear()).required().messages({
        'number.base': 'El año debe ser un número',
        'number.integer': 'El año debe ser un número entero',
        'number.min': 'El año no puede ser anterior a 1950',
        'number.max': `El año no puede ser mayor a ${new Date().getFullYear()}`,
        'any.required': 'El año es obligatorio'
    }),
    tags: Joi.array().items(Joi.string()).messages({
        'array.base': 'Los tags deben ser una lista de cadenas de texto',
    })
});

export default juegoSchema;