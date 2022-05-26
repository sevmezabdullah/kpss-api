const express = require('express');
const questionRouter = express.Router();
const {
  createQuestionContoller,
  getAllQuestionController,
  deleteQuestionController,
  updateQuestionByIdController,
  getQuestionByIdController,
} = require('./question.controller');

questionRouter.post('/createQuestion', createQuestionContoller);
questionRouter.get('/getAllQuestion', getAllQuestionController);
questionRouter.delete('/deleteById/:id', deleteQuestionController);
questionRouter.put('/updateQuestion/:id', updateQuestionByIdController);
questionRouter.get('/getQuestionById/:id', getQuestionByIdController);

module.exports = questionRouter;
