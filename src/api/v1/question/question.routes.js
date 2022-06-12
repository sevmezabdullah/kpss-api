const express = require('express');
const questionRouter = express.Router();

const Question = require('../../../models/question/question.schema');

const {
  createQuestionContoller,
  getAllQuestionController,
  deleteQuestionController,
  updateQuestionByIdController,
  getQuestionByIdController,

  getHowManyWrongAnswerQuestionByIdController,
  getHowManyCorrectAnswerQuestionByIdController,
} = require('./question.controller');

const advancedResults = require('../../../middlewares/advenced.result');

questionRouter.post('/createQuestion', createQuestionContoller);

questionRouter.get(
  '/getAllQuestion',
  advancedResults(Question, 'title'),
  getAllQuestionController
);
questionRouter.delete('/deleteById/:id', deleteQuestionController);
questionRouter.put('/updateQuestion/:id', updateQuestionByIdController);
questionRouter.get('/getQuestionById/:id', getQuestionByIdController);

questionRouter.get(
  '/getHowManyWrongCount/:questionId',
  getHowManyWrongAnswerQuestionByIdController
);
questionRouter.get(
  '/getHowManyCorrectCount/:questionId',
  getHowManyCorrectAnswerQuestionByIdController
);

module.exports = questionRouter;
