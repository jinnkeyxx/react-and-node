const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const options = {
  timestamps: { createdAt: true, updatedAt: true },
};
const friends = new Schema({
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
},options);
module.exports = mongoose.model('friends', friends); // friends db