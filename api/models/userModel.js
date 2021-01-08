const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {
  timestamps: { createdAt: true, updatedAt: true },
};
const users = new Schema({
  email: {
    type:String,
    required: true
  },
  username: {
    type:String,
    required: true,
    min : 6,
    max:32
  },
  password: {
    type:String,
    required: true,
  },
  role: {
    type:Number,
  },
  security: {
    type:String,
    required: true,
  }
},options);
module.exports = mongoose.model('users', users); // users db