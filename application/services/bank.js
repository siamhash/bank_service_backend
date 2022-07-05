const { bank_accounts, users, bank_transactions, sequelize, Sequelize : { OP } } = require('../../models')

const registerAccount = async (data) => {
    try {
        const { email } = data;
        const user = await users.findOne({
            where : {
                email
            }
        });
        const { id } = user;
        const result = await bank_accounts.create({
            user_id : id,
            account_number : `${Date.now()}${Math.floor((Math.random() * 1000))}`,
            ifsc : 'BANK0000453',
            created: Date.now(),
            updated: Date.now(),
        });
        if(result){
            const { account_number } = result
            return { response: { account_number: account_number }  }
        }
        return { error: "Unable to Open Bank Account." };
    } catch (error) {
        return { error: "Unable to Open Bank Account." };
    }
}

const userAccounts = async (data) => {
    try {
        const { email, id } = data;
        const accounts = await bank_accounts.findAll({
            where : {
                user_id : id,
            },
            include: [
                { model: users, as: 'users',
                    attributes : ['name','email'],
                },
            ],
        });
        if(accounts){
            return { response: { accounts: accounts }  }
        }
        return { error: "Unable to get Account." };
    } catch (error) {
        return { error: "Unable to get Account." };
    }
}

const creditAmount = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, id: user_id , account_number , ifsc, amount  } = data;
        const account = await bank_accounts.findOne({
            where : {
                account_number,
                ifsc,
            },
            transaction
        });
        if(account){
            const { id : bank_account_id } = account;
            const doc = {
                user_id,
                bank_account_id,
                txn_id : `txn_${Date.now()}${Math.floor((Math.random() * 1000))}`,
                txn_type : 'credit',
                amount,
                remarks : "amount credit through bank details.",
                created: Date.now(),
                updated: Date.now(),
            };
            const credit = await bank_transactions.create(doc,{ transaction });
            await transaction.commit();
            return { response: { accounts: account }  }
        }
        await transaction.rollback();
        return { error: "Invalid Account Details." };
    } catch (error) {
        await transaction.rollback();
        return { error: "Unable to credit Account." };
    }
}
const checkAccountBalance = async (payload) => {
    const { user_id } = payload;
    try {
        const docBalance = await bank_transactions.findOne({
        attributes: [
            [ sequelize.literal(`(select sum(amount) from bank_transactions where user_id='${user_id}' AND txn_type='credit')`), 'totalBalance' ],
            [ sequelize.literal(`(select sum(amount) from bank_transactions where user_id='${user_id}' AND txn_type='debit')`), 'debitBalance' ],
        ],
        });

        let balance = 0;

        if (docBalance) {
        const { dataValues: { totalBalance, debitBalance } } = docBalance;
            if (totalBalance) {
                balance = totalBalance;
                if (debitBalance) {
                    balance -= parseInt(debitBalance);
                }
            }
        }
        return { doc: { balance } };
    } catch (error) {
        return { error: "Unable to get balance." };
    }
}

const accountTransactionHistory = async (payload) => {
    const { id : user_id, account_number } = payload;
    try {
        const bank = await bank_accounts.findOne({
            where : { 
                account_number
            }
        })
        if(!bank){
            return { error: "Invalid Account Number." };
        }
        const { id: bank_account_id } = bank;
        const docTransaction = await bank_transactions.findAll({
            where : {
                user_id,
                bank_account_id,
            }
        });
        if(docTransaction){
            return { doc: docTransaction };
        }
        return { doc: [] };
    } catch (error) {
        return { error: "Unable to get account transactions." };
    }
}

const transferAmount = async (data) => {
    const transaction = await sequelize.transaction();
    try {
        const { email, id: user_id , account_number , ifsc, amount  } = data;
        const checkUserAccount = await bank_accounts.findOne({
            where : {
                user_id 
            },
            transaction
        });
        if(!checkUserAccount){
            await transaction.rollback();
            return { error: "You have not registered account" };
        }
        const checkAccountNumber = await bank_accounts.findOne({
            where : {
                account_number,
                ifsc 
            },
            transaction
        });
        if(!checkAccountNumber){
            await transaction.rollback();
            return { error: "Invalid Account number and ifsc code." };
        }
        const checkSelfaccount = await bank_accounts.findOne({
            where : {
                account_number,
                ifsc,
                user_id
            },
            transaction
        });
        if(checkSelfaccount){
            await transaction.rollback();
            return { error: "Dont Transfer Amount to same Account." };
        }
        const { error , doc } = await checkAccountBalance({ user_id });
        if(error){
            await transaction.rollback();
            return { error: "Unable to fetch Account Balance" };
        }
        const { balance  }  = doc;
        if(balance < amount ){
            await transaction.rollback();
            return { error: "Insufficient balance to transfer." };
        }
        const { id : user_bank_id  } = checkUserAccount
        const newdoc1 = {
            user_id,
            bank_account_id : user_bank_id,
            txn_id : `txn_${Date.now()}${Math.floor((Math.random() * 1000))}`,
            txn_type : 'debit',
            amount,
            remarks : "amount debit for bank to bank transfer.",
            created: Date.now(),
            updated: Date.now(),
        };
        const debit = await bank_transactions.create(newdoc1,{ transaction });
        if(debit){
            const { id: to_user_bank_id,user_id : toUserId }  = checkAccountNumber
            const newdoc2 = {
                user_id : toUserId,
                bank_account_id : to_user_bank_id,
                txn_id : `txn_${Date.now()}${Math.floor((Math.random() * 1000))}`,
                txn_type : 'credit',
                amount,
                remarks : "amount credit for bank to bank transfer.",
                created: Date.now(),
                updated: Date.now(),
            };
            const credit = await bank_transactions.create(newdoc2,{ transaction });
            await transaction.commit();
            return { response: { accounts: credit }  }
        }
        await transaction.rollback();
        return { error: "Unable to Transfer Amount at this moment." };
    } catch (error) {
        await transaction.rollback();
        return { error: "Unable to Transfer Amount at this moment" };
    }
}
module.exports = {
    registerAccount, userAccounts, creditAmount, transferAmount, accountTransactionHistory
}