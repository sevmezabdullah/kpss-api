//+ Projeyi versiyonlayabilmek için api.js ve app.js adında iki dosya oluşturduk.
//+ api.js dosyası gelen istekleri route etmek istediğimiz js dosyalarına yönlendirecek.
const express = require('express');
const api = express.Router();

//api.use('/v1/question',questionRouter);
//api.use('/v1/test',testRouter);
//api.use('/v1/user',userRouter);

//api.use('/v2/question',questionRouter);
//api.use('/v2/test',testRouter);
//api.use('/v2/user',userRouter);

module.exports = api;
