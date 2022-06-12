//+ UserSchema modelinin tasarlandığı model katmanıdır.
const mongoose = require('mongoose');
const Joi = require('joi');

//+ userSchemayı tasarlıyoruz.
const userSchema = mongoose.Schema({
  //+ Kullanıcının adını tuttuğum property
  name: {
    type: String,
    required: true,
  },
  //+ Kullanıcının soyadını tuttuğum property
  surname: {
    type: String,
    required: true,
  },
  //+ Kullanıcının email adresini tuttuğum property
  email: {
    type: String,
    required: true,
    unique: [true, ''],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  isVerify: {
    type: Boolean,
    default: false,
  },
  //+ Kullanıcının şifresini tuttuğum property. Sorgularda gizlemek için select:false kullanıldı.
  password: {},

  //+ Kullanıcının tamamladığı testlerin id lerinin liste halinde tutulduğu property. {testId : {correctCount:15,wrongCount:25,{question.category.correct:10,question.category.wrong:25}}} şeklinde kullanıcının doğru bildiği ve yanlış bildiği soru sayısı da tutulacak

  completedExamResults: [{ type: mongoose.Schema.Types.Mixed, unique: true }],

  //+ Kullanıcının katıldığı ancak tamamlamadığı testlerin id lerinin liste olarak tutulduğu property
  unCompletedExams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],

  //+ Kullanıcının diğer kullanıcılarla sıralamasının karşılaştırılması için puan bilgisinin tutulduğu property
  rank: {
    type: Number,
    default: 0,
  },

  //+ Kullanıcının sisteme erişirken yetkisine göre katmanlara erişmesini sağlayan property
  role: {
    type: String,
    default: 'user',
  },

  //+ Kullanıcının profil resminin linkinin tutulduğu property
  profilePic: {
    type: String,
    default:
      'https://www.seekpng.com/png/detail/847-8474751_download-empty-profile.png',
  },
});

userSchema.methods.joiValidate = function (obj) {
  var schema = {
    email: Joi.string().required(),
  };
  return Joi.valid(obj, schema);
};
//+userSchemayı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('User', userSchema);
