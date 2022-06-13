//+ UserSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const bcrypt = require('bcrypt');
const User = require('./user.schema');
const cloudinary = require('../../utils/cloudinary');
//+ Kullanıcı kaydı için kullanılacak metottur.
async function registerUser(user) {
  const hashedPassword = await bcrypt.hash(`${user.password}`, 10, null);
  user.password = hashedPassword;
  const userDB = new User(user);
  const registeredUser = await userDB.save();
  return registeredUser;
}

async function passwordChecker(email, password) {
  const user = await User.findOne({ email: email });
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

//+ Kullanıcının email ve password ile projeye giriş yaptığı metottur.
async function loginUser(email, password) {
  const user = await User.findOne({ email: email });
  // const compare = await bcrypt.compare(password, user.password);
  return user;
}

//+ Kullanıcının şifresini değiştirdiği metottur.{profil sayfasındayken.}
async function changePassword(userId, newPassword) {
  const hashPassword = await bcrypt.hash(`${newPassword}`, 10, null);
  const result = await User.findByIdAndUpdate(userId, {
    $set: { password: hashPassword },
  });
  return result;
}

async function changeProfileImage(email, profilePic, public_id) {
  const removePicturefromUser = await User.findOne({ email: email });
  await cloudinary.uploader.destroy(removePicturefromUser.public_id);

  const updatedProfileImageUser = await User.findOneAndUpdate(
    { email: email },
    { $set: { profilePic: profilePic, public_id: public_id } },
    { new: true }
  );

  return updatedProfileImageUser;
}

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
  const result = await User.find();
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
    $inc: { rank: result.result.correctCount * 10 },
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

async function loginWithGoogleMobile(email, name, surname, profilePic) {
  const user = await User.findOne({ email: email });

  if (!user) {
    console.log('Kullanıcı bulunamadı');

    const createdUser = new User({
      email,
      name,
      surname,
      profilePic,
      isVerify: true,
    });

    const savedUser = createdUser.save();

    return savedUser;
  }
  return user;
}

module.exports = {
  loginUser,
  registerUser,

  changePassword,
  changeProfileImage,

  verifyUserByUserId,

  getUserById,
  getAllUser,
  deleteUserById,
  updateUserRoleById,
  passwordChecker,
  addCompletedTestToUser,
  addUnCompletedExamToUser,
  loginWithGoogleMobile,
};
