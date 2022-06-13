const express = require('express');
const passport = require('../../../middlewares/auth');
const userRouter = express.Router();

const asyncHandler = require('../../../middlewares/async');
const User = require('../../../models/user/user.schema');
const advencedResults = require('../../../middlewares/advenced.result');

const CLIENT_URL = '/api/v1/user/profile';

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const {
  userRegisterController,
  userLoginController,
  userProfileController,
  uploadImage,
  verifyUserByIdController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  addUnCompletedExamToUserController,
  addCompletedExamToUserController,
  updateUserRoleByIdController,
  loginWithGoogleMobileController,
  changeProfileImageController,
  forgotPasswordController,
} = require('../user/user.controller');

userRouter.post('/register', userRegisterController);
userRouter.post('/forgotPassword', forgotPasswordController);

userRouter.post('/login', (request, response, next) => {
  console.log(request.body);
  passport.authenticate('local', {
    successRedirect: '/profile',
  })(request, response, next);
});

userRouter.post('/mobile-google-login', loginWithGoogleMobileController);

userRouter.get('/google', passport.authenticate('google'));

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login',
  }),
  (request, response) => {
    response.redirect('/');
  }
);

userRouter.get('/profile', asyncHandler(userProfileController));

userRouter.post('/addUnCompletedExam', addUnCompletedExamToUserController);
userRouter.post('/addCompletedExam', addCompletedExamToUserController);

userRouter.get(
  '/allUser',
  advencedResults(User, 'name'),
  asyncHandler(getAllUserController)
);
userRouter.get('/userById/:userId', getUserByIdController);

userRouter.delete('/deleteUser', deleteUserByIdController);

userRouter.put('/verfiyUser/:userId', verifyUserByIdController);
userRouter.put('/changeRole', updateUserRoleByIdController);
userRouter.put(
  '/changeProfileImage',
  uploadImage.single('picture'),

  changeProfileImageController
);

module.exports = userRouter;
