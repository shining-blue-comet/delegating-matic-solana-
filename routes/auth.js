const express = require('express');
const authController = require('../controllers/authController');
const authorize = require('../middleware/auth');

const router = express.Router();

router.post('/signup', authController.singup);
router.post('/login', authController.login);
router.post('/addwallet', authorize, (req, res, next) => {
  authController.addWallet(req, res);
});

router.get('/', authorize, (req, res, next) => {
  authController.test(req, res);
})

module.exports = router;