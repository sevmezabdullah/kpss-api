const express = require('express');

const userRouter = express.Router();

const {
  userRegisterController,
  verifyUserByIdController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  addUnCompletedExamToUserController,
  addCompletedExamToUserController,
  updateUserRoleByIdController,
} = require('../user/user.controller');

userRouter.post('/register', userRegisterController);
userRouter.post('/addUnCompletedExam', addUnCompletedExamToUserController);
userRouter.post('/addCompletedExam', addCompletedExamToUserController);

userRouter.get('/allUser', getAllUserController);
userRouter.get('/userById/:userId', getUserByIdController);

userRouter.delete('/deleteUser', deleteUserByIdController);

userRouter.put('/verfiyUser/:userId', verifyUserByIdController);
userRouter.put('/changeRole', updateUserRoleByIdController);

module.exports = userRouter;
