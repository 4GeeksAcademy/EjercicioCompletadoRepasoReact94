// TaskForm.jsx
import React, { useState } from "react";

function TaskForm(props) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("La tarea no puede estar vacía");
      return;
    }

    props.onAddTask(title);
    setTitle("");
    setError("");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>Añadir Nueva Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="taskTitle" className="form-label">
              Título de la tarea
            </label>
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              id="taskTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Comprar leche"
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Añadir Tarea
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
