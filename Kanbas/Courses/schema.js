import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  _id: String, // we have customized course id
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: false
  },
  credit: {
    type: Number,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  image: String
});

export default courseSchema;
