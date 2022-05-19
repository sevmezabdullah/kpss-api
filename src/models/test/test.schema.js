//! TestSchema modelinin tasarlandığı model katmanıdır.
const mongoose = require('mongoose');

//!testSchemayı tasarlıyoruz
const testSchema = mongoose.Schema({
  //! Testin başlığını tutan propertydir.
  title: {
    type: String,
    required: true,
  },
  //! Testin içereceği soruların id lerinin liste tipinde tutulduğu property dir.
  questionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],

  //! Teste katılan kullanıcların id lerinin liste tipinde tutulduğu property dir.
  userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  //! Testte verilen toplam doğru cevap sayısıdır.
  correctCount: {
    type: Number,
    default: 0,
  },

  //! Testte verilen toplan yanlış cevap sayıdır.
  wrongCount: {
    type: Number,
    default: 0,
  },

  //! Testin toplam görüntülenme sayısıdır.
  seenCount: {
    type: Number,
    default: 0,
  },

  //! Testin toplam görüntülenme süresidir.
  duration: {
    type: Number,
    required: true,
  },
  //! Testing kategorisinin tutulduğu propertydir. [YKS,KPSS,LYS,SBS,OBS,HGS :)]
  category: {
    type: String,
    required: true,
  },
});

//! testSchemayı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('Test', testSchema);
