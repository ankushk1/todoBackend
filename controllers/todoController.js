const Todo = require('../models/Todo');

exports.createTodo = (req, res) => {
  try {
    Todo.create(
      {
        text: req.body.text,
        date: req.body.date,
      },
      function (err, todo) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: 'Error in creating Todo' });
        }

        return res.status(200).json({ todo: todo, message: 'Todo created' });
      }
    );
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
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getTodobyID = (req, res) => {
  try {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: 'Error in getting Todo' });
      }
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found in DB' });
      }
      return res.status(200).json({ todo: todo });
    });
  } catch (err) {
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
