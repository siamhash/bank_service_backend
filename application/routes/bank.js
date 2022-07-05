const { registerAccount, userAccounts, creditAmount, transferAmount, accountTransactionHistory } = require('../controllers/bank');
const authenticate = require('../auth');
module.exports = (router) => {
    router.post('/register-account', authenticate, registerAccount);
    router.get('/user-account-details', authenticate, userAccounts);
    router.post('/credit-amount', authenticate, creditAmount);
    router.post('/transfer-amount', authenticate, transferAmount);
    router.get('/account-txn-history/:accountNumber', authenticate, accountTransactionHistory);
}