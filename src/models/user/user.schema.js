//! UserSchema modelinin tasarlandığı model katmanıdır.
const mongoose = require('mongoose');

//! userSchemayı tasarlıyoruz.
const userSchema = mongoose.Schema({});

//!userSchemayı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('User', userSchema);
