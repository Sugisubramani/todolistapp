const mongoose = require('mongoose');

const TodoItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false // New tasks are incomplete by default
  }
});

module.exports = mongoose.model('todos', TodoItemSchema);
