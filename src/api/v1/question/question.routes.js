const express = require('express');
const questionRouter = express.Router();
const {
  createQuestionContoller,
  getAllQuestionController,
  deleteQuestionController,
  updateQuestionByIdController,
  getQuestionByIdController,
  checkUserAnswerController,
  getHowManyWrongAnswerQuestionByIdController,
  getHowManyCorrectAnswerQuestionByIdController,
} = require('./question.controller');

questionRouter.post('/createQuestion', createQuestionContoller);
questionRouter.post('/checkUserAnswer', checkUserAnswerController);
questionRouter.get('/getAllQuestion', getAllQuestionController);
questionRouter.delete('/deleteById/:id', deleteQuestionController);
questionRouter.put('/updateQuestion/:id', updateQuestionByIdController);
questionRouter.get('/getQuestionById/:id', getQuestionByIdController);
//! ====== Working =====
questionRouter.get(
  '/getHowManyWrongCount/:questionId',
  getHowManyWrongAnswerQuestionByIdController
);

//! ====== Working =====
questionRouter.get(
  '/getHowManyCorrectCount/:questionId',
  getHowManyCorrectAnswerQuestionByIdController
);

module.exports = questionRouter;
