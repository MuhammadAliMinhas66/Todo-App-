import express from 'express';
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todo.js';

const router = express.Router();

router.post('/create/todos', createTodo);
router.get('/get/todos', getTodos);
router.get('/get/todo/:id', getTodoById);
router.put('/update/todo/:id', updateTodo);
router.delete('/delete/todo/:id', deleteTodo);

export default router;


