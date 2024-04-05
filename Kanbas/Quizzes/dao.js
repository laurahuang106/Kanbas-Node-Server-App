import model from "./model.js";

// actions for quizzes
export const createQuiz = (quiz) => model.create(quiz); // plcaeholder
export const findAllQuizs = () => model.find();
export const findQuizById = (quizId) => model.findById(quizId);
export const updateQuiz = (quizId, quiz) =>  model.updateOne({ _id: quizId }, { $set: quiz });
export const deleteQuiz = (quizId) => model.deleteOne({ _id: quizId });

// actions for questions
export const addQuestionToQuiz = async (quizId, questionData) => {
    const quiz = await model.findById(quizId);
    quiz.questions.push(questionData);
    await quiz.save();
    return quiz;
};
export const findQuestionById = async (quizId, questionId) => {
    const quiz = await model.findById(quizId);
    return quiz.questions.id(questionId); // Mongoose subdocument querying syntax
};
export const updateQuestionInQuiz = async (quizId, questionId, questionUpdate) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    if (question) {
      question.set(questionUpdate);
      await quiz.save();
      return question;
    }
    throw new Error('Question not found');
};
export const deleteQuestionFromQuiz = async (quizId, questionId) => {
    const quiz = await model.findById(quizId);
    const question = quiz.questions.id(questionId);
    if (question) {
      question.remove();
      await quiz.save();
      return quiz; 
    }
    throw new Error('Question not found');
};
  