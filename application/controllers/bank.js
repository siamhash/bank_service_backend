const { bankService } = require('../services');
const isSchemaValid = require('../utilities/validators');
const { registerAccountSchema, creditAmountSchema, transferAmountSchema, accountTransactionSchema } = require('../schemas');
const Joi = require('joi');

const registerAccount = async (req,res) => {
    try {
        const { body, user : { id , email } } = req;
        const data = { ...body, id, email };
        const { errors }  = isSchemaValid({ data, schema: registerAccountSchema });
        if(errors){
            res.status(400).json({
                status : "failed",
                message : errors,
            });
        }
        const { error , response } = await bankService.registerAccount(data);
        if(response){
            res.status(200).json({
                status : "success",
                message : "created Successfully",
                data : response
            });   
        }else{
            res.status(400).json({
                status : "failed",
                message : error,
            }); 
        } 
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error,
        }); 
    }
}
const userAccounts = async (req,res) => {
    try {
        const { body, user : { id , email } } = req;
        const data = { ...body, id, email };
        const { errors }  = isSchemaValid({ data, schema: registerAccountSchema });
        if(errors){
            res.status(400).json({
                status : "failed",
                message : errors,
            });
        }
        const { error , response } = await bankService.userAccounts(data);
        if(response){
            res.status(200).json({
                status : "success",
                message : "details get successfully",
                data : response
            });   
        }else{
            res.status(400).json({
                status : "failed",
                message : error,
            }); 
        } 
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error,
        }); 
    }
}

const creditAmount = async (req,res) => {
    try {
        const { body, user : { id , email } } = req;
        const data = { ...body, id, email };
        const { errors }  = isSchemaValid({ data, schema: creditAmountSchema });
        if(errors){
            res.status(400).json({
                status : "failed",
                message : errors,
            });
        }
        const { error , response } = await bankService.creditAmount(data);
        if(response){
            res.status(200).json({
                status : "success",
                message : "Amount credited successfully",
                data : response
            });   
        }else{
            res.status(400).json({
                status : "failed",
                message : error,
            }); 
        } 
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error,
        }); 
    }
}

const transferAmount = async (req,res) => {
    try {
        const { body, user : { id , email } } = req;
        const data = { ...body, id, email };
        const { errors }  = isSchemaValid({ data, schema: transferAmountSchema });
        if(errors){
            res.status(400).json({
                status : "failed",
                message : errors,
            });
        }
        const { error , response } = await bankService.transferAmount(data);
        if(response){
            res.status(200).json({
                status : "success",
                message : "Amount credited successfully",
                data : response
            });   
        }else{
            res.status(400).json({
                status : "failed",
                message : error,
            }); 
        } 
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error,
        }); 
    }
}
const accountTransactionHistory = async (req,res) => {
    try {
        const { body, user : { id , email } ,params : { accountNumber: account_number } } = req;
        const data = { ...body, id , email, account_number };
        const { errors }  = isSchemaValid({ data, schema: accountTransactionSchema });
        if(errors){
            res.status(400).json({
                status : "failed",
                message : errors,
            });
        }
        const { error , doc } = await bankService.accountTransactionHistory(data);
        if(doc){
            res.status(200).json({
                status : "success",
                message : "History retrieve successfully",
                data : doc
            });   
        }else{
            res.status(400).json({
                status : "failed",
                message : error,
            }); 
        } 
    } catch (error) {
        res.status(400).json({
            status : "failed",
            message : error,
        }); 
    }
}

module.exports = {
    registerAccount, userAccounts , creditAmount, transferAmount, accountTransactionHistory
}