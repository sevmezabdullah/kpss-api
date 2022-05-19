//! QuestionSchama sının tasarlandığı model katmanıdır.
const mongoose = require('mongoose');

//! questionSchema oluşturuldu.
const questionSchema = mongoose.Schema({});

//! questionSchema yı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('Question', questionSchema);
