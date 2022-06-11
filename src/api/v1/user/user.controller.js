const {
  registerUser,
  verifyUserByUserId,
  deleteUserById,
  getAllUser,
  getUserById,
  addUnCompletedExamToUser,
  addCompletedTestToUser,
  updateUserRoleById,
  loginUser,
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

//! Completed
async function getAllUserController(request, response) {
  const result = await getAllUser();
  if (result != null) {
    return response.status(200).json(result);
  } else {
    return response.status(404).json({ message: notFoundedUserMessage });
  }
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
};
