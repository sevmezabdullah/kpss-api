const express = require('express');
const questionRouter = express.Router();
const {
  createQuestionContoller,
  getAllQuestionController,
  deleteQuestionController,
} = require('./question.controller');

questionRouter.post('/createQuestion', createQuestionContoller);
questionRouter.get('/getAllQuestion', getAllQuestionController);
questionRouter.delete('/deleteById/:id', deleteQuestionController);

module.exports = questionRouter;
