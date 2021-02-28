const { Router } = require('express');
const express = require('express');

const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodobyID,
  deleteTodo,
  updateTodos,
} = require('../controllers/todoController');

router.post('/create', createTodo);
router.get('/todos', getTodos);
router.get('/todo/:id', getTodobyID);
router.delete('/delete/:id', deleteTodo);
router.patch('/update/:id', updateTodos);

module.exports = router;
