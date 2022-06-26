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

const {
  sendActivationEmail,
  sendForgotPasswordEmail,
} = require('../../../utils/mail.sender');
const {
  verifiedEmailAdress,

  notFoundedUserMessage,
  unCompletedExamError,

  completedExamMessage,
  passwordChanged,
  emailSubjectMessage,
  userCreationErrorMessage,
  forgotEmailMessage,

  serverSideErrorMessage,
  loginWithGmailErrorMessage,
  passwordChangingErrorMessage,
  updateUserRoleMessage,
  loginErrorMessage,
  updateUserRoleErrorMessage,
  checkYourEmailAdressMessage,
} = require('./res/response.messages');

//! Completed
async function userRegisterController(request, response) {
  const user = request.body;
  const savedUser = await registerUser(user);

  if (request.file != null) {
  }

  const isSentMail = await sendActivationEmail(
    config.SMTP_EMAIL,
    savedUser.email,
    savedUser._id,
    emailSubjectMessage
  );
  if (isSentMail != null) {
    if (isSentMail.accepted.length > 0) {
      return response.status(200).json({
        data: savedUser,
        success: true,
      });
    } else {
      return response
        .status(404)
        .json({ error: userCreationErrorMessage, success: false });
    }
  } else {
    return response.status(500).json({
      error: serverSideErrorMessage,
      success: false,
    });
  }
}

//! Completed
async function changePasswordController(request, response) {
  const token = request.headers.authorization.split(' ')[1];
  const decodedJWT = jwtDecode(token);
  const changedPasswordUser = await changePassword(
    decodedJWT.id,
    request.body.password
  );

  if (changedPasswordUser != null) {
    return response.status(201).json({ data: passwordChanged, success: true });
  } else {
    return response
      .status(404)
      .json({ error: passwordChangingErrorMessage, success: false });
  }
}

async function userLoginController(request, response) {
  const user = await loginUser(request.body.email, request.body.password);

  if (user != null) {
    return response.status(200).json({ data: user, success: true });
  } else {
    return response
      .status(404)
      .json({ error: loginErrorMessage, success: false });
  }
}

//! Completed
async function loginWithGoogleMobileController(request, response) {
  const email = request.body.email;
  const name = request.body.name;
  const surname = request.body.surname;
  const profilePic = request.body.profilePic;
  const user = await loginWithGoogleMobile(email, name, surname, profilePic);

  if (user != null) {
    return response.status(200).json({ data: user, success: true });
  } else {
    return response.status(404).json({
      error: loginWithGmailErrorMessage,
      success: false,
    });
  }
}

//! TODO
async function changeProfileImageController(request, response) {
  const changedProfileImage = await changeProfileImage(
    request.body.email,
    result.url,
    result.public_id
  );

  if (changeProfileImage != null) {
    return response.status(201).json({
      picture: result.url,
      public_id: result.public_id,
      user: changedProfileImage,
      success: true,
      message: 'Profil resmi değişikliği başarılı.',
    });
  }
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
      data: checkYourEmailAdressMessage,
      success: true,
    });
  } else {
    return response
      .status(404)
      .json({ error: registerMailErrorMessage, success: false });
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
    return response.status(200).json({ data: result, success: true });
  } else {
    return response
      .status(404)
      .json({ error: notFoundedUserMessage, success: false });
  }
}

//! Completed
async function verifyUserByIdController(request, response) {
  const verifiedUser = await verifyUserByUserId(request.params.userId);

  if (verifiedUser != null) {
    return response
      .status(200)
      .json({ data: `${verifiedEmailAdress}`, success: true });
  } else {
    return response
      .status(404)
      .json({ error: `${notFoundedUserMessage}`, success: false });
  }
}

//! Completed
async function deleteUserByIdController(request, response) {
  const deletedUser = await deleteUserById(request.body.userId);
  if (deletedUser != null) {
    return response.status(200).json({
      data: deletedUser,
      success: true,
    });
  } else {
    return response
      .status(404)
      .json({ error: `${notFoundedUserMessage}`, success: false });
  }
}

async function addUnCompletedExamToUserController(request, response) {
  const result = await addUnCompletedExamToUser(
    request.body.userId,
    request.body.examId
  );

  if (result != null) {
    return response.status(200).json({ data: result, success: true });
  } else {
    return response
      .status(404)
      .json({ error: unCompletedExamError, success: false });
  }
}

//! Completed
async function addCompletedExamToUserController(request, response) {
  const examResult = request.body.examResult;
  const result = await addCompletedTestToUser(examResult.userId, examResult);

  if (result != null) {
    return response
      .status(201)
      .json({ data: completedExamMessage, success: true });
  } else {
    return response
      .status(404)
      .json({ message: notFoundedUserMessage, success: false });
  }
}

//! Completed
async function updateUserRoleByIdController(request, response) {
  const role = request.body.role;
  const result = await updateUserRoleById(request.body.userId, role);

  if (result != null) {
    return response.status(200).json({
      data: `${result.name} ${updateUserRoleMessage}`,
      success: true,
    });
  } else {
    return response
      .status(404)
      .json({ error: updateUserRoleErrorMessage, success: false });
  }
}

function uploadImage(request, result) {
  const file = request.file;
  const fileExt = file.originalname.split('.');
  const fileType = fileExt[fileExt.length - 1];
  console.log(file.originalname);
  console.log(fileType);

  const oldImagePath = path.join(__dirname, '../../../../', file.path);

  const newImagePath = path.join(
    __dirname,
    '../../../../uploads/questions',
    result.id + '.' + fileType
  );
  fs.rename(oldImagePath, newImagePath, (err) => {});

  return (
    'http://' +
    request.hostname +
    `:${config.PORT}/uploads/questions/` +
    result.id +
    '.' +
    fileType
  );
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

  loginWithGoogleMobileController,
  forgotPasswordController,
  changePasswordController,
};
