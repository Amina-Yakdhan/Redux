import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store';

function Addtask() {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
     return;
    }

    dispatch(addTask(trimmedDescription));
    setDescription('');
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label htmlFor="new-task">What needs doing?</label>
      <div className="add-task__controls">
        <input
          id="new-task"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Add a task..."
          maxLength={120}
        />
        <button type="submit">Add task</button>
      </div>
    </form>
  );
}

export default Addtask;
