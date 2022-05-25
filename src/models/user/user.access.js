//+ UserSchema hakkında sorguların olduğu DAL(Data Access Layer) katmanıdır.

//+ Kullanıcı kaydı için kullanılacak metottur.
async function registerUser(user) {}
//+ Kullanıcının email ve password ile projeye giriş yaptığı metottur.
async function loginUser(email, password) {}

//+ Kullanıcının şifresini değiştirdiği metottur.{profil sayfasındayken.}
async function changePassword(userId, newPassword) {}

//+ Email bilgisiyle kullanıcının sistemde kayıtlı olup olmadığını doğrulayan metottur.{Şifremi unuttum sayfası için}
async function verifyUserByEmail(email) {}

//+ Kayıtlı tüm kullanıcıları getiren metottur.
async function getAllUser() {}

//+ Id bilgisine göre kullanıcının silindiği metottur.{Admin}
async function deleteUserById(userId) {}

//+ Id bilgisine göre kullanıcının rolünün güncellendiği metottur.{Admin}
async function updateUserRoleById(userId, newRole) {}

//+ Tamamlanan testin kullancıya sonuçlarıyla beraber eklendiği metotdur.
//!{testId:{correctCount:15,wrongCount:15}}
async function addCompletedTestToUser(userId, result) {}

//+ Id bilgisine göre kullanıcının tamamlayamadığı test kullanıcıya ekleyen metottur.
async function addUnCompletedTestToUser(userId, testId) {}

//+ Id bilgisine ve kullanıcının test sonucuna göre puanını artıran metotdur.
async function incrementRankUserById(userId) {}

//+ Id bilgisine ve imageLink parametresine göre kullanıcının profil resmini değiştiren metottur.
async function changeProfilePic(userId, imageLink) {}

module.exports = {
  loginUser,
  registerUser,
  changePassword,
  verifyUserByEmail,
  changeProfilePic,

  getAllUser,
  deleteUserById,
  updateUserRoleById,

  addCompletedTestToUser,
  addUnCompletedTestToUser,
  incrementRankUserById,
};
