const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers')


router.post('/register', async (req, res) => {
	res.send(await userController.registerUser(req.body))
});
router.post('/login', async (req, res) => {
	res.send(await userController.loginUser(req.body))
}) 
router.post('/details', async (req, res) => {
	res.send(await userController.getProfile({ userId: req.body.id }))
})

module.exports = router;