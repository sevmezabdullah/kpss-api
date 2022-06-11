const express = require('express');
const passport = require('../../../middlewares/auth');
const userRouter = express.Router();

const CLIENT_URL = 'http://localhost:3000/api/v1/user/profile';

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const {
  userRegisterController,
  userLoginController,
  verifyUserByIdController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  addUnCompletedExamToUserController,
  addCompletedExamToUserController,
  updateUserRoleByIdController,
} = require('../user/user.controller');

userRouter.post('/register', userRegisterController);
userRouter.post('/login', userLoginController);

userRouter.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: true,
  })
);

userRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

userRouter.get('/profile', (request, response) => {
  return response
    .status(200)
    .json({ message: 'giriş yapıldı', user: `${request.user}` });
});

userRouter.post('/addUnCompletedExam', addUnCompletedExamToUserController);
userRouter.post('/addCompletedExam', addCompletedExamToUserController);

userRouter.get('/allUser', getAllUserController);
userRouter.get('/userById/:userId', getUserByIdController);

userRouter.delete('/deleteUser', deleteUserByIdController);

userRouter.put('/verfiyUser/:userId', verifyUserByIdController);
userRouter.put('/changeRole', updateUserRoleByIdController);

module.exports = userRouter;
