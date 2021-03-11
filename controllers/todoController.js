const Todo = require('../models/Todo');
const User = require('../models/User');
exports.createTodo = async (req, res) => {
  try {
    const id = req.params.userId;
    console.log(id)
    const todo = await Todo.create({
      text: req.body.text,
      date: req.body.date,
    });
    await todo.save();
    const user =await User.findById(id);
    console.log(user)
    user.todos.push(todo);
    await user.save();
    return res.status(200).json({ todo: todo, message: 'Todo Created' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTodobyUserID = async (req, res) => {
  try {
    let id = req.params.userId;
    console.log(id);
    await User.findById(id).populate('todos').exec((err,user) => {
      if(err) {
        console.log('err')
        return res.status(400).json({ message: 'Cannot Find User'})
      }
      return res.status(200).json(user.todos)
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTodos = (req, res) => {
  try {
    Todo.find(function (err, todos) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Error in getting Todo' });
      }
      return res.status(200).json({ todos: todos, message: 'All Todos' });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteTodo = (req, res) => {
  try {
    let id = req.params.id;
    Todo.findByIdAndDelete(id, function (err, todo) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Error in deleting Todo' });
      }
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found in DB' });
      }
      return res.status(200).json({ message: 'Todo deleted having id: ' + id });
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateTodos = (req, res) => {
  try {
    let id = req.params.id;
    Todo.findByIdAndUpdate(
      id,
      {
        text: req.body.text,
      },
      function (err, todo) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: 'Error in updating Todo' });
        }
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found in DB' });
        }
        return res
          .status(200)
          .json({ message: 'Todo updated having id: ' + id });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
