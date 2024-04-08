import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ['MultipleChoice', 'TrueFalse', 'FillInTheBlank'], 
  },
  questionTitle: String,
  questionPoints: Number,
  questionBody: String,
  correctAnswer: String,
  possibleAnswers: [String],
});

const quizSchema = new mongoose.Schema({
  id: String,
  quizTitle: String,
  quizDesc: String,
  quizType: {
    type: String,
    enum: ['GradedQuiz', 'PracticeQuiz', 'GradedSurvey', 'UngradedSurvey'], 
  },
  quizPoints: Number,
  assignmentGroup: {
    type: String,
    enum: ['Quizzes', 'Exams', 'Assignments', 'Project'], 
  },
  shuffleAnswers: Boolean,
  timeLimit: Number,
  multipleAttempts: Boolean,
  showCorrectAnswers: Boolean,
  accessCode: String,
  oneQuestionPerTime: Boolean,
  webcamRequired: Boolean,
  lockQuestions: Boolean,
  quizDueDate: Date,
  quizStartDate: Date,
  quizUntilDate: Date,
  isPublished: Boolean,
  questions: [questionSchema], // Embedding Questions schema
  course: {
    type: String,
    ref: 'Course' ,  // placeholder need to check
  },
}, { collection: 'quizzes' });

export default quizSchema;
