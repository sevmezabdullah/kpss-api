const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Users',
  },
});
const {
  registerUser,
  verifyUserByUserId,
  deleteUserById,
  getUserById,
  addUnCompletedExamToUser,
  addCompletedTestToUser,
  updateUserRoleById,
  loginUser,
  loginWithGoogleMobile,
} = require('../../../models/user/user.access');

const { sendActivationEmail } = require('../../../utils/mail.sender');
const {
  createdUserMessage,
  namedUserRegisteredMessage,
  registeredUserMessage,
  verifiedEmailAdress,
  deletedUserMessage,
  notFoundedUserMessage,
  unCompletedExamError,
  completedExamMessage,
} = require('./res/response.messages');

async function userRegisterController(request, response) {
  const user = request.body;
  const result = await registerUser(user);

  const isSentMail = sendActivationEmail(
    'abdullahsevmez@gmail.com',
    'abdullahsevmez@gmail.com,'
  );

  if (isSentMail) {
    return response.status(200).json({
      user: `${result.name} ${namedUserRegisteredMessage}`,
      snackMessage: createdUserMessage,
      message: registeredUserMessage,
    });
  }
}

async function userLoginController(request, response) {
  const user = await loginUser(request.body.email, request.body.password);

  return response.status(200).json(user);
}

async function loginWithGoogleMobileController(request, response) {
  const email = request.body.email;
  const name = request.body.name;
  const surname = request.body.surname;
  const profilePic = request.body.profilePic;
  const user = await loginWithGoogleMobile(email, name, surname, profilePic);

  return response.status(200).json(user);
}

async function changeProfileImageController(request, response) {
  return response.status(200).json({ picture: request.file.path });
}

async function userProfileController(request, response) {
  console.log(request.user);
  return response
    .status(200)
    .json({ message: 'Kullanıcı profili', user: request.user });
}

//! Completed
async function getAllUserController(request, response, next) {
  return response.status(200).json(response.advancedResults);
}

//! Completed
async function getUserByIdController(request, response) {
  const result = await getUserById(request.params.userId);
  if (result != null) {
    return response.status(200).json(result);
  } else {
    return response.status(404).json({ message: notFoundedUserMessage });
  }
}

//! Completed
async function verifyUserByIdController(request, response) {
  const verifiedUser = await verifyUserByUserId(request.params.userId);

  if (verifiedUser != null) {
    return response.status(200).json({ message: `${verifiedEmailAdress}` });
  } else {
    return response.status(404).json({ message: `${notFoundedUserMessage}` });
  }
}

//! Completed
async function deleteUserByIdController(request, response) {
  const deletedUser = await deleteUserById(request.body.userId);
  if (deletedUser != null) {
    return response.status(200).json({
      message: `${deletedUser.name} ${deletedUser.surname} ${deletedUserMessage}.`,
    });
  } else {
    return response.status(404).json({ message: `${notFoundedUserMessage}` });
  }
}

async function addUnCompletedExamToUserController(request, response) {
  const result = await addUnCompletedExamToUser(
    request.body.userId,
    request.body.examId
  );

  if (result != null) {
    return response.status(200).json(result);
  } else {
    return response.status(404).json({ message: unCompletedExamError });
  }
}

//! Completed
async function addCompletedExamToUserController(request, response) {
  const examResult = request.body.examResult;
  const result = await addCompletedTestToUser(examResult.userId, examResult);

  if (result != null) {
    return response.status(201).json({ message: completedExamMessage });
  } else {
    return response.status(404).json({ message: notFoundedUserMessage });
  }
}

//! Completed
async function updateUserRoleByIdController(request, response) {
  const role = request.body.role;
  const result = await updateUserRoleById(request.body.userId, role);

  if (result != null) {
    return response.status(200).json({
      message: ``,
    });
  }
}

const uploadImage = multer({
  storage: storage,
  dest: '12345',
  preservePath: true,
});
module.exports = {
  userRegisterController,
  userLoginController,
  verifyUserByIdController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  addUnCompletedExamToUserController,
  addCompletedExamToUserController,
  updateUserRoleByIdController,
  changeProfileImageController,
  userProfileController,
  loginWithGoogleMobileController,
  uploadImage,
};
