const express = require('express');

const userRouter = express.Router();

const { userRegisterController } = require('../user/user.controller');

userRouter.post('/register', userRegisterController);
module.exports = userRouter;
