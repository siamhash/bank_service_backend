const Joi = require('joi');
const credit_amount = Joi.object({
    id: Joi.required(),
    email: Joi.string().min(5).max(50).email().required(),
    account_number : Joi.string().required(),
    ifsc : Joi.string().required(),
    amount : Joi.number().precision(2).required()
});
module.exports = credit_amount;