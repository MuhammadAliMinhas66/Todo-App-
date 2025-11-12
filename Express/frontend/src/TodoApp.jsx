import { useState, useEffect } from 'react';
import './TodoApp.css';

const API_URL = 'http://localhost:5000/api/v1';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/get/todos`);
      const data = await response.json();
      if (data.success) {
        setTodos(data.todos);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/create/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();
      if (data.success) {
        setTitle('');
        setDescription('');
        fetchTodos();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Error creating todo');
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const updateTodo = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/update/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.success) {
        fetchTodos();
        setEditingId(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Error updating todo');
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/delete/todo/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchTodos();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Error deleting todo');
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleComplete = async (todo) => {
    await updateTodo(todo._id, { completed: !todo.completed });
  };

  // Handle edit
  const startEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setEditingId(todo._id);
  };

  const cancelEdit = () => {
    setTitle('');
    setDescription('');
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateTodo(editingId, { title, description });
    } else {
      createTodo(e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-app">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      
      <div className="todo-container">
        <header className="todo-header">
          <div className="header-content">
            <h1 className="app-title">
              <span className="title-icon">✨</span>
              Task Master
            </h1>
            <p className="app-subtitle">Organize your life, one task at a time</p>
            {totalCount > 0 && (
              <div className="stats">
                <span className="stat-item">
                  <span className="stat-number">{completedCount}</span>
                  <span className="stat-label">Completed</span>
                </span>
                <span className="stat-divider">•</span>
                <span className="stat-item">
                  <span className="stat-number">{totalCount - completedCount}</span>
                  <span className="stat-label">Pending</span>
                </span>
              </div>
            )}
          </div>
        </header>
        
        <div className="todo-form-wrapper">
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="input-group">
              <label className="input-label">Task Title</label>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="todo-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Description (Optional)</label>
              <textarea
                placeholder="Add more details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="todo-textarea"
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="todo-submit" disabled={loading}>
                {loading ? (
                  <span className="button-content">
                    <span className="spinner"></span>
                    Processing...
                  </span>
                ) : editingId ? (
                  <span className="button-content">
                    <span className="button-icon">💾</span>
                    Update Task
                  </span>
                ) : (
                  <span className="button-content">
                    <span className="button-icon">➕</span>
                    Add Task
                  </span>
                )}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="todo-cancel">
                  <span className="button-content">
                    <span className="button-icon">✖️</span>
                    Cancel
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="todo-list-container">
          <div className="todo-list-header">
            <h2 className="list-title">
              <span className="list-icon">📋</span>
              Your Tasks
            </h2>
            {loading && <div className="loading-indicator">Loading...</div>}
          </div>
          
          <div className="todo-list">
            {todos.length === 0 && !loading && (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <h3 className="empty-title">No tasks yet</h3>
                <p className="empty-message">Start by adding your first task above!</p>
              </div>
            )}
            {todos.map((todo, index) => (
              <div
                key={todo._id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="todo-checkbox-wrapper">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo)}
                    className="todo-checkbox"
                    id={`todo-${todo._id}`}
                  />
                  <label htmlFor={`todo-${todo._id}`} className="checkbox-label"></label>
                </div>
                <div className="todo-content">
                  <h3 className={`todo-title ${todo.completed ? 'strike-through' : ''}`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`todo-description ${todo.completed ? 'strike-through' : ''}`}>
                      {todo.description}
                    </p>
                  )}
                </div>
                <div className="todo-actions">
                  <button
                    onClick={() => startEdit(todo)}
                    className="todo-edit"
                    disabled={loading}
                    title="Edit task"
                  >
                    <span className="action-icon">✏️</span>
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="todo-delete"
                    disabled={loading}
                    title="Delete task"
                  >
                    <span className="action-icon">🗑️</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;


