const express = require('express');

const userRouter = express.Router();

const asyncHandler = require('../../../middlewares/async');
const User = require('../../../models/user/user.schema');
const advencedResults = require('../../../middlewares/advenced.result');

const upload = require('../../../utils/multer');

const { protect, authorize } = require('../../../middlewares/auth');

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

userRouter.post('/register', asyncHandler(userRegisterController));
userRouter.post('/forgotPassword', asyncHandler(forgotPasswordController));
userRouter.post('/login', asyncHandler(userLoginController));
userRouter.post(
  '/mobile-google-login',
  asyncHandler(loginWithGoogleMobileController)
);
userRouter.put('/verfiyUser/:userId', asyncHandler(verifyUserByIdController));
userRouter.put(
  '/changePassword',
  protect,
  asyncHandler(changePasswordController)
);

userRouter.get('/profile', protect, asyncHandler(userProfileController));

userRouter.post(
  '/addUnCompletedExam',
  protect,
  asyncHandler(addUnCompletedExamToUserController)
);
userRouter.post(
  '/addCompletedExam',
  protect,
  asyncHandler(addCompletedExamToUserController)
);

userRouter.get(
  '/allUser',
  protect,
  authorize('admin'),
  advencedResults(User, 'unCompletedExams completedExamResults'),
  asyncHandler(getAllUserController)
);
userRouter.get(
  '/userById/:userId',
  protect,
  asyncHandler(getUserByIdController)
);

userRouter.delete(
  '/deleteUser',
  protect,
  authorize('admin'),
  asyncHandler(deleteUserByIdController)
);

userRouter.put(
  '/changeRole',
  protect,
  authorize('admin'),
  asyncHandler(updateUserRoleByIdController)
);
userRouter.put(
  '/changeProfileImage',
  protect,
  upload.single('profile'),
  asyncHandler(changeProfileImageController)
);

module.exports = userRouter;
