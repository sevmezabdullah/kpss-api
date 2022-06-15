const config = require('../../../config/config');
const jwtDecode = require('jwt-decode');
const {
  registerUser,
  verifyUserByUserId,
  changePassword,
  deleteUserById,
  getUserById,
  addUnCompletedExamToUser,
  addCompletedTestToUser,
  updateUserRoleById,
  loginUser,
  loginWithGoogleMobile,
  changeProfileImage,
} = require('../../../models/user/user.access');
const cloudinary = require('../../../utils/cloudinary');

const {
  sendActivationEmail,
  sendForgotPasswordEmail,
} = require('../../../utils/mail.sender');
const {
  createdUserMessage,
  namedUserRegisteredMessage,
  registeredUserMessage,
  verifiedEmailAdress,
  deletedUserMessage,
  notFoundedUserMessage,
  unCompletedExamError,
  completedExamMessage,
  emailSubjectMessage,
  forgotEmailMessage,
  registerMailErrorMessage,
} = require('./res/response.messages');

async function userRegisterController(request, response) {
  const user = request.body;
  const savedUser = await registerUser(user);

  const isSentMail = await sendActivationEmail(
    config.SMTP_EMAIL,
    savedUser.email,
    savedUser._id,
    emailSubjectMessage
  );

  if (isSentMail != null) {
    if (isSentMail.accepted.length > 0) {
      return response.status(200).json({
        user: `${savedUser.name} ${namedUserRegisteredMessage}`,
        snackMessage: createdUserMessage,
        message: registeredUserMessage,
      });
    } else {
      return response
        .status(404)
        .json({ errorMessage: registerMailErrorMessage });
    }
  } else {
    return response.status(500).json({
      errorMessage:
        'Sunucularımızda geçici bir arıza meydana gelmiştir lütfen kısa bir süre sonra tekrar deneyin',
    });
  }
}

async function changePasswordController(request, response) {
  const token = request.headers.authorization.split(' ')[1];

  const decodedJWT = jwtDecode(token);

  const changedPasswordUser = await changePassword(
    decodedJWT.id,
    request.body.password
  );

  return response
    .status(201)
    .json({ message: 'Şifre değiştirildi', user: changedPasswordUser });
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
  const result = await cloudinary.uploader.upload(request.file.path);

  const changedProfileImage = await changeProfileImage(
    request.body.email,
    result.url,
    result.public_id
  );
  return response.status(201).json({
    picture: result.url,
    public_id: result.public_id,
    user: changedProfileImage,
    success: true,
    message: 'Profil resmi değişikliği başarılı.',
  });
}

async function userProfileController(request, response) {
  console.log(request.user);
  return response
    .status(200)
    .json({ message: 'Kullanıcı profili', user: request.user });
}

//! Completed
async function forgotPasswordController(request, response) {
  const toEmail = request.body.email;
  const isSentMail = await sendForgotPasswordEmail(
    config.SMTP_EMAIL,
    toEmail,
    forgotEmailMessage
  );

  if (isSentMail.accepted.length > 0) {
    return response.status(200).json({
      message: 'Lütfen gönderilen epostayı kontrol edin',
      success: true,
    });
  } else {
    return response.status(404).json(registerMailErrorMessage);
  }
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
      message: `${result.name} isimli kullanıcının yetkisi güncellendi`,
    });
  }
}

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
  forgotPasswordController,
  changePasswordController,
};
