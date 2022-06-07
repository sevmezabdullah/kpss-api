const {
  registerUser,
  verifyUserByUserId,
  deleteUserById,
  getAllUser,
  getUserById,
  addUnCompletedExamToUser,
  addCompletedTestToUser,
  updateUserRoleById,
} = require('../../../models/user/user.access');

const { sendEmail } = require('../../../utils/mail.sender');
const {
  createdUserMessage,
  namedUserRegisteredMessage,
  registeredUserMessage,
  verifiedEmailAdress,
  deletedUserMessage,
  notFoundedUserMessage,
} = require('./res/response.messages');

async function userRegisterController(request, response) {
  const user = request.body;
  const result = await registerUser(user);

  const isSentMail = sendEmail(
    'abdullahsevmez@gmail.com',
    'abdullahsevmez@gmail.com,',
    '<h1>Başarılı</h1>'
  );

  if (isSentMail) {
    return response.status(200).json({
      user: `${result.name} ${namedUserRegisteredMessage}`,
      snackMessage: createdUserMessage,
      message: registeredUserMessage,
    });
  }
}

async function getAllUserController(request, response) {
  const result = await getAllUser();

  return response.status(200).json(result);
}

async function getUserByIdController(request, response) {
  const result = await getUserById(request.params.userId);
  return response.status(200).json(result);
}

async function verifyUserByIdController(request, response) {
  const verifiedUser = await verifyUserByUserId(request.params.userId);

  if (verifiedUser != null) {
    return response.status(200).json({ message: `${verifiedEmailAdress}` });
  } else {
    return response.status(200).json({ message: `${notFoundedUserMessage}` });
  }
}

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

  return response.status(200).json(result);
}

async function addCompletedExamToUserController(request, response) {
  const examResult = request.body.examResult;
  const result = await addCompletedTestToUser(examResult.userId, examResult);
  if (result != null) {
    return response
      .status(201)
      .json({ message: 'Sınav başarıyla tamamlandı.' });
  }
  return response.status(200).json(result);
}

async function updateUserRoleByIdController(request, response) {
  const role = request.body.role;
  const updatedUserRole = await updateUserRoleById(request.body.userId, role);
  return response.status(200).json({
    message: `${updateUserRoleById.name} isimli kullanıcının yetkisi değiştirildi. `,
  });
}
module.exports = {
  userRegisterController,
  verifyUserByIdController,
  deleteUserByIdController,
  getAllUserController,
  getUserByIdController,
  addUnCompletedExamToUserController,
  addCompletedExamToUserController,
  updateUserRoleByIdController,
};
