// TaskList.jsx
import React from "react";
import TaskItem from './TaskItem';

function TaskList(props) {
  if (props.tasks.length === 0) {
    return <p className="text-center mt-4">No hay tareas pendientes.</p>;
  }

  return (
    <div className="mt-4">
      <h2>Mis Tareas ({props.tasks.length})</h2>
      {props.tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onDelete={props.onDelete}
          onToggleComplete={props.onToggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;