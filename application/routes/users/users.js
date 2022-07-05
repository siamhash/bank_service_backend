const { login , signup } = require('../../controllers/user/users');
const authenticate = require('../../auth');
module.exports = (router) => {
    router.post('/login',login);
    router.post('/signup',signup);
}