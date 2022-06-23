const namedUserRegisteredMessage = 'isimli kullanıcının kaydı oluşturuldu.';

const deletedUserMessage = `isimli kullanıcı başarıyla silindi.`;
const notFoundedUserMessage = 'kullanıcı bulunamadı.';
const unCompletedExamError = 'Tamamlanmayan sınavın eklenmesinde hata oluştu.';
const completedExamMessage = 'Sınav başarıyla tamamlandı.';
const emailSubjectMessage = 'Hesap Aktivasyonu';
const forgotEmailMessage =
  'Şifrenizi mi unuttunuz ? Mailde gönderilen linke tıklayarak kolayca sıfırlayabilirsiniz.';

//////////////////////
const userCreationErrorMessage = 'Kullanıcı kaydı oluşturma başarısız.';
const serverSideErrorMessage =
  'Sunucularımızda geçici bir arıza meydana gelmiştir lütfen kısa bir süre sonra tekrar deneyin';
const passwordChangingErrorMessage = 'Şifre değiştirilirken hata oluştu.';
const passwordChanged = 'Şifre değiştirildi';
const loginErrorMessage = 'Giriş başarısız oldu';
const loginWithGmailErrorMessage = 'Google ile giriş yapılırken sorun oluştu.';
const updateUserRoleMessage = 'isimli kullanıcının yetkisi güncellendi';
const updateUserRoleErrorMessage = 'Kullanıcı rolü güncelleme başarısız.';
const checkYourEmailAdressMessage =
  'Lütfen email adresinize gönderilen epostayı kontrol ediniz.';

const verifiedEmailAdress = 'E-Posta Aktivasyonu tamamlandı.';
module.exports = {
  namedUserRegisteredMessage,

  verifiedEmailAdress,
  deletedUserMessage,
  notFoundedUserMessage,
  passwordChanged,
  unCompletedExamError,
  completedExamMessage,
  emailSubjectMessage,
  forgotEmailMessage,

  userCreationErrorMessage,
  serverSideErrorMessage,
  passwordChangingErrorMessage,
  loginErrorMessage,
  loginWithGmailErrorMessage,
  updateUserRoleMessage,
  updateUserRoleErrorMessage,
  checkYourEmailAdressMessage,
};
