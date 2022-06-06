const express = require('express');

const userRouter = express.Router();

const {
  userRegisterController,
  verifyUserByIdController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
} = require('../user/user.controller');

userRouter.post('/register', userRegisterController);

userRouter.get('/allUser', getAllUserController);
userRouter.get('/userById/:userId', getUserByIdController);

userRouter.delete('/deleteUser', deleteUserByIdController);

userRouter.put('/verfiyUser/:userId', verifyUserByIdController);

module.exports = userRouter;
