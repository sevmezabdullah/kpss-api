const express = require('express');
const passport = require('../../../middlewares/auth');
const userRouter = express.Router();

const asyncHandler = require('../../../middlewares/async');
const User = require('../../../models/user/user.schema');
const advencedResults = require('../../../middlewares/advenced.result');

const CLIENT_URL = '/api/v1/user/profile';
const upload = require('../../../utils/multer');
function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const {
  userRegisterController,
  userLoginController,
  userProfileController,
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
  changePasswordController,
} = require('../user/user.controller');

userRouter.post('/register', userRegisterController);

userRouter.put('/changePassword', changePasswordController);

userRouter.post('/forgotPassword', forgotPasswordController);

userRouter.post('/login', userLoginController);

userRouter.post('/mobile-google-login', loginWithGoogleMobileController);

userRouter.get('/google', passport.authenticate('google'));

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login',
  }),
  (request, response) => {
    console.log(response);
    response.redirect('/');
  }
);
userRouter.get('/profile', asyncHandler(userProfileController));
userRouter.get('/google', passport.authenticate('google'));

userRouter.post('/addUnCompletedExam', addUnCompletedExamToUserController);
userRouter.post('/addCompletedExam', addCompletedExamToUserController);

userRouter.get(
  '/allUser',

  advencedResults(User),
  asyncHandler(getAllUserController)
);
userRouter.get('/userById/:userId', getUserByIdController);

userRouter.delete('/deleteUser', deleteUserByIdController);

userRouter.put('/verfiyUser/:userId', verifyUserByIdController);
userRouter.put('/changeRole', updateUserRoleByIdController);
userRouter.put(
  '/changeProfileImage',
  upload.single('profile'),
  changeProfileImageController
);

module.exports = userRouter;
