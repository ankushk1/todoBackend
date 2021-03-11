const { Router } = require('express');
const express = require('express');

const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodobyUserID,
  deleteTodo,
  updateTodos,
} = require('../controllers/todoController');

router.post('/create/:userId', createTodo);
router.get('/todos', getTodos);
router.get('/todos/:userId', getTodobyUserID);
router.delete('/delete/:id', deleteTodo); 
router.patch('/update/:id', updateTodos);

module.exports = router;
