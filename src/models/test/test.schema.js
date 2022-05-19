//! TestSchema modelinin tasarlandığı model katmanıdır.
const mongoose = require('mongoose');

//!testSchemayı tasarlıyoruz
const testSchema = mongoose.Schema({});

//! testSchemayı module.exports ile dışarı çıkarıyoruz.
module.exports = mongoose.model('Test', testSchema);
