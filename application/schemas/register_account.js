const Joi = require('joi');
const register_account = Joi.object({
    id: Joi.required(),
    email: Joi.string().email().required(),
});
module.exports = register_account;