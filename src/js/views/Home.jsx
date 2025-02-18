// App.jsx (con useEffect y fetch)
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = 'https://jsonplaceholder.typicode.com/todos';
  
  // Cargar tareas al montar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL + '?_limit=5');
        if (!response.ok) {
          throw new Error('Error al cargar las tareas');
        }
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);
  
  // Función para añadir tarea (POST)
  const addTask = async (title) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
          title,
          completed: false,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      const newTask = await response.json();
      // JSONPlaceholder devuelve id=201, 202, etc. 
      // Para visualización correcta, asignamos un id único
      newTask.id = Date.now();
      
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Error al añadir la tarea');
    }
  };
  
  // Función para eliminar tarea (DELETE)
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Error al eliminar la tarea');
    }
  };
  
  // Función para actualizar estado de tarea (PUT)
  const toggleTaskComplete = async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...taskToUpdate,
          completed: !taskToUpdate.completed
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      
      const updatedTask = await response.json();
      
      setTasks(tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
      ));
    } catch (err) {
      setError('Error al actualizar la tarea');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando tareas...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Mi Gestor de Tareas</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onDelete={deleteTask}
        onToggleComplete={toggleTaskComplete}
      />
    </div>
  );
}

export default Home;