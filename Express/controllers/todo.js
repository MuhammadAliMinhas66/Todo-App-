import todoModel from "../models/todo.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Title is required", success: false });
    }

    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    return res.status(201).json({ message: "Todo created successfully", success: true, todo: newTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: "Todos fetched successfully", success: true, todos });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

// Get todo by ID
export const getTodoById = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todo = await todoModel.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found", success: false });
    }
    return res.status(200).json({ message: "Todo fetched successfully", success: true, todo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

// Update todo
export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedData = req.body;
    const updatedTodo = await todoModel.findByIdAndUpdate(todoId, updatedData, { new: true });
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found", success: false });
    }
    return res.status(200).json({ message: "Todo updated successfully", success: true, todo: updatedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};

// Delete todo
export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await todoModel.findByIdAndDelete(todoId);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found", success: false });
    }
    return res.status(200).json({ message: "Todo deleted successfully", success: true, todo: deletedTodo });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
  }
};


