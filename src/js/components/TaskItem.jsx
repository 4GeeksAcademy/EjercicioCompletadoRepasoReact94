import React from "react";

function TaskItem(props) {
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5
            className={
              props.task.completed ? "text-decoration-line-through" : ""
            }
          >
            {props.task.title}
          </h5>
          <p className="text-muted mb-0">ID: {props.task.id}</p>
        </div>
        <div>
          <button
            className={`btn ${
              props.task.completed ? "btn-secondary" : "btn-success"
            } me-2`}
            onClick={() => props.onToggleComplete(props.task.id)}
          >
            {props.task.completed ? "Reactivar" : "Completar"}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => props.onDelete(props.task.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
