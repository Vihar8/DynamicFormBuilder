const Joi = require('joi');

const moduleSchema = Joi.object({
    actionType: Joi.number().valid(1, 2, 3, 4).required(),
    id: Joi.number().optional(),
    moduleName: Joi.string().max(255).when('actionType', { is: 1, then: Joi.required() }),
    type: Joi.number().when('actionType', { is: 1, then: Joi.required() }),
    description: Joi.string().max(500).allow(null, ''),
    qtyBased: Joi.number().valid(0, 1),
    perQtyPrice: Joi.number().precision(2).default(0),
    latPrice: Joi.number().precision(2).default(0),
    isActive: Joi.number().valid(0, 1),
    isDelete: Joi.number().valid(0, 1)
});

module.exports = moduleSchema;
