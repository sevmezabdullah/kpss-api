const express = require('express');
const questionRouter = express.Router();
const {
  createQuestionContoller,
  getAllQuestionController,
  deleteQuestionController,
  updateQuestionByIdController,
  getQuestionByIdController,

  getHowManyWrongAnswerQuestionByIdController,
  getHowManyCorrectAnswerQuestionByIdController,
} = require('./question.controller');

questionRouter.post('/createQuestion', createQuestionContoller);

questionRouter.get('/getAllQuestion', getAllQuestionController);
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
