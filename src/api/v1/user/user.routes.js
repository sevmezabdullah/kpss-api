const express = require('express');

const userRouter = express.Router();

const {
  userRegisterController,
  verifyUserByIdController,
  deleteUserByIdController,
} = require('../user/user.controller');

userRouter.post('/register', userRegisterController);
userRouter.delete('/deleteUser', deleteUserByIdController);
userRouter.put('/verfiyUser/:userId', verifyUserByIdController);
module.exports = userRouter;
