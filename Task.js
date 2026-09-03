import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../store';

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);
  const dispatch = useDispatch();

  const handleSave = (event) => {
    event.preventDefault();
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      return;
    }

    dispatch(editTask(task.id, trimmedDescription));
    setDescription(trimmedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li className={`task ${task.isDone ? 'task--done' : ''}`}>
      <button
        className="task__check"
        type="button"
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.isDone ? 'Mark task as not done' : 'Mark task as done'}
        aria-pressed={task.isDone}
      >
        {task.isDone ? '✓' : ''}
      </button>
      {isEditing ? (
        <form className="task__edit" onSubmit={handleSave}>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-label="Edit task description"
            autoFocus
            maxLength={120}
          />
          <button type="submit" className="task__action task__action--save">
            Save
          </button>
          <button type="button" className="task__action" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task__description">{task.description}</span>
          <button
            type="button"
            className="task__action"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            type="button"
            className="task__action task__action--delete"
            onClick={() => dispatch(deleteTask(task.id))}
            aria-label={`Delete ${task.description}`}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default Task;
