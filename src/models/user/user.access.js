//+ UserSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.
const bcrypt = require('bcrypt');
const User = require('./user.schema');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

//+ Kullanıcı kaydı için kullanılacak metottur.
async function registerUser(user) {
  const hashedPassword = await bcrypt.hash(`${user.password}`, 10, null);
  user.password = hashedPassword;
  user.authSource = 'classic';
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
  const user = await User.findOne({ email: email }).select(
    'name surname password profilePic authSource isVerify'
  );

  if (user != null) {
    if (user.authSource == 'google') {
      return {
        errorMessage:
          'Bu hesap daha önce google ile giriş seçeneği ile kaydolmuştur. Lütfen Google ile giriş yapmayı deneyin',
      };
    }
  }

  if (user == null) {
    return { errorMessage: 'Kullanıcı bulunamadı' };
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (comparePassword) {
    let token = await generateToken(user.id, user.role);

    if (user.isVerify) {
      return { user, token };
    } else {
      return {
        errorMessage:
          'Lütfen e-posta adresindeki onay epostasını kontrol edin.',
      };
    }
  } else {
    return { errorMessage: 'Eposta yada şifre hatalı' };
  }
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
  if (public_id != null) {
    const updatedProfileImageUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { profilePic: profilePic, public_id: public_id } },
      { new: true }
    );

    return updatedProfileImageUser;
  }
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
  const result = await User.find().populate('unCompletedExams');
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

async function generateToken(userId, userRole) {
  const token = jwt.sign({ id: userId, role: userRole }, config.JWT_SECRET);
  return token;
}

async function loginWithGoogleMobile(email, name, surname, profilePic) {
  const user = await User.findOne({ email: email }).select(
    'name surname profilePic'
  );
  let token = '';
  if (!user) {
    const createdUser = new User({
      authSource: 'google',
      email,
      name,
      surname,
      profilePic,
      isVerify: true,
    });
    const savedUser = await createdUser.save();
    token = await generateToken(savedUser._id, savedUser.role);
    savedUser.token = token;
    return { savedUser, token };
  }
  token = await generateToken(user._id, user.role);
  user.token = token;
  return { user, token };
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
