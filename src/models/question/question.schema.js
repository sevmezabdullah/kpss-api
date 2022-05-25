//+ QuestionSchama sının tasarlandığı model katmanıdır.
const mongoose = require('mongoose');

//+ questionSchema oluşturuldu.
const questionSchema = mongoose.Schema({
  //+ Sorunun gösterileceği metin
  title: {
    type: String,
    required: true,
    unique: true,
  },

  //+ Cevap Listesi
  answerList: {
    type: [String],
    required: true,
  },
  //+ Doğru cevabın indexi
  correctAnswerIndex: {
    type: Number,
    required: true,
  },

  //+ Sorunun toplam görüntülenme sayısı
  seenCount: {
    type: Number,
    default: 0,
  },
  //+ Sorunun kategorisi
  category: {
    type: String,
    required: true,
  },
  //+ Sorunun tipi - test ya da  drawable olabilir. Matematik ve Geometri sorularının ekranda çözülebilmesi için gerekli.
  type: {
    type: String,
    require: true,
    default: 'test',
  },
});

//+ questionSchema yı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('Question', questionSchema);
