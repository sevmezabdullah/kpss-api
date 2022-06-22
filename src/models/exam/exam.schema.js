//+ TestSchema modelinin tasarlandığı model katmanıdır.
const mongoose = require('mongoose');

//+ TestSchemayı tasarlıyoruz
const examSchema = mongoose.Schema(
  {
    //+ Testin başlığını tutan propertydir.
    title: {
      type: String,
      required: true,
    },
    //+ Testin içereceği soruların id lerinin liste tipinde tutulduğu property dir.
    questionList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],

    createdAt: {
      type: Date,
      default: Date.now(),
    },
    //+ Teste katılan kullanıcların id lerinin liste tipinde tutulduğu property dir.
    userIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    //+ Testin toplam görüntülenme sayısıdır.
    seenCount: {
      type: Number,
      default: 0,
    },

    //+ Testin toplam görüntülenme süresidir.
    duration: {
      type: Number,
      required: true,
    },
    //+ Testin kategorisinin tutulduğu propertydir. [YKS,KPSS,LYS,SBS,OBS,HGS :)]
    category: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

//+ testSchemayı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('Exam', examSchema);
