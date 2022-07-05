const loginSchema = require('./user/login');
const signupSchema = require('./user/signup');
const registerAccountSchema = require('./register_account')
const creditAmountSchema = require('./credit_amount');
const transferAmountSchema = require('./transfer_amount');
const accountTransactionSchema = require('./account_transaction');
module.exports = {
    loginSchema, signupSchema, registerAccountSchema, creditAmountSchema, transferAmountSchema, accountTransactionSchema
}