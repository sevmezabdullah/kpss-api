//+ UserSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const bcrypt = require('bcrypt');
const User = require('./user.schema');

//+ Kullanıcı kaydı için kullanılacak metottur.
async function registerUser(user) {
  const hashedPassword = await bcrypt.hash(`${user.password}`, 10, null);
  user.password = hashedPassword;
  const userDB = new User(user);
  const registeredUser = await userDB.save();

  return registeredUser;
}
//+ Kullanıcının email ve password ile projeye giriş yaptığı metottur.
async function loginUser(email, password) {}

//+ Kullanıcının şifresini değiştirdiği metottur.{profil sayfasındayken.}
async function changePassword(userId, newPassword) {}

//+ Email bilgisiyle kullanıcının sistemde kayıtlı olup olmadığını doğrulayan metottur.{Şifremi unuttum sayfası için}
async function verifyUserByUserId(userId) {
  const verifiedUser = await User.findByIdAndUpdate(
    userId,
    { isVerify: true },
    { new: true }
  );
  return verifiedUser;
}

//+ Kayıtlı tüm kullanıcıları getiren metottur.
async function getAllUser() {
  const result = await User.find({});
  return result;
}

async function getUserById(userId) {
  const dbResult = await User.findById(userId);
  return dbResult;
}
//+ Id bilgisine göre kullanıcının silindiği metottur.{Admin}
async function deleteUserById(userId) {
  const dbResult = await User.findByIdAndDelete(userId);
  return dbResult;
}

//+ Id bilgisine göre kullanıcının rolünün güncellendiği metottur.{Admin}
async function updateUserRoleById(userId, newRole) {
  const roleUpdatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: { role: newRole },
    },
    { new: true }
  ).select('name surname');

  return roleUpdatedUser;
}

//+ Tamamlanan testin kullancıya sonuçlarıyla beraber eklendiği metotdur.
//!{testId:{correctCount:15,wrongCount:15}}
async function addCompletedTestToUser(userId, result) {
  result.createdAt = Date.now();
  const dbResult = await User.findByIdAndUpdate(userId, {
    $push: { completedExamResults: result },
  });

  return dbResult;
}

//+ Id bilgisine göre kullanıcının tamamlayamadığı test kullanıcıya ekleyen metottur.
async function addUnCompletedExamToUser(userId, examId) {
  const dbResult = await User.findByIdAndUpdate(userId, {
    $push: { unCompletedExams: examId },
  });
  return dbResult;
}

//+ Id bilgisine ve kullanıcının test sonucuna göre puanını artıran metotdur.
async function incrementRankUserById(userId) {}

//+ Id bilgisine ve imageLink parametresine göre kullanıcının profil resmini değiştiren metottur.
async function changeProfilePic(userId, imageLink) {}

module.exports = {
  loginUser,
  registerUser,
  changePassword,
  verifyUserByUserId,
  changeProfilePic,
  getUserById,
  getAllUser,
  deleteUserById,
  updateUserRoleById,

  addCompletedTestToUser,
  addUnCompletedExamToUser,
  incrementRankUserById,
};
