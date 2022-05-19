//! Projeyi versiyonlayabilmek için api.js ve app.js adında iki dosya oluşturduk.
//! api.js dosyası gelen istekleri route etmek istediğimiz js dosyalarına yönlendirecek.
const express = require('express');
const api = express.Router();

//api.use('/v1/question',questionRouter);

module.exports = api;
