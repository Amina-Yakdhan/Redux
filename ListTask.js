import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store';
import Task from './Task';

function ListTask() {
  const dispatch = useDispatch();
  const { tasks, filter } = useSelector((state) => state);
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'done') {
      return task.isDone;
    }
    if (filter === 'not-done') {
      return !task.isDone;
    }
    return true;
  });

  return (
    <section className="task-list" aria-labelledby="task-list-title">
      <div className="task-list__header">
        <div>
          <p className="eyebrow">Your list</p>
          <h2 id="task-list-title">Tasks</h2>
        </div>
        <span className="task-count">{tasks.length} total</span>
      </div>
      <div className="filters" role="group" aria-label="Filter tasks">
        {[
          ['all', 'All'],
          ['not-done', 'To do'],
          ['done', 'Done'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={filter === value ? 'filter filter--active' : 'filter'}
            onClick={() => dispatch(setFilter(value))}
            aria-pressed={filter === value}
          >
            {label}
          </button>
        ))}
      </div>
      {visibleTasks.length > 0 ? (
        <ul className="tasks">
          {visibleTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-state__mark">—</span>
          <p>{tasks.length === 0 ? 'Your list is clear.' : 'Nothing here yet.'}</p>
          <span>Add something small and make it real.</span>
        </div>
      )}
    </section>
  );
}

export default ListTask;
