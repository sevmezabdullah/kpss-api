const { registerUser } = require('../../../models/user/user.access');

const { sendEmail } = require('../../../utils/mail.sender');
const {
  createdUserMessage,
  namedUserRegisteredMessage,
  registeredUserMessage,
} = require('./res/response.messages');

async function userRegisterController(request, response) {
  const user = request.body;
  const result = await registerUser(user);

  sendEmail('abdullahsevmez@gmail.com', 'başarılı,', '<h1>Başarılı</h1>');

  return response.status(200).json({
    user: `${result.name} ${namedUserRegisteredMessage}`,
    snackMessage: createdUserMessage,
    message: registeredUserMessage,
  });
}

module.exports = {
  userRegisterController,
};
