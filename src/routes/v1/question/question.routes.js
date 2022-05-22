const express = require('express');
const questionRouter = express.Router();
const { createQuestionContoller } = require('./question.controller');

questionRouter.post('/createQuestion', createQuestionContoller);

module.exports = questionRouter;
