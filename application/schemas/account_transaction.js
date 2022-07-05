const Joi = require('joi');
const transfer_account = Joi.object({
    id: Joi.required(),
    email: Joi.string().min(5).max(50).email().required(),
    account_number : Joi.string().required(),
});
module.exports = transfer_account;