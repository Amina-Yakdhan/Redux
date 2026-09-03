import {createStore } from 'redux';

const initialState = {
  tasks: [],
  filter: 'all',
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isDone: !task.isDone }
            : task
        ),
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, description: action.payload.description }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}

export const addTask = (description) => ({
  type: 'ADD_TASK',
  payload: {
    id: Date.now(),
    description,
    isDone: false,
  },
});

export const toggleTask = (id) => ({ type: 'TOGGLE_TASK', payload: id });
export const editTask = (id, description) => ({
  type: 'EDIT_TASK',
  payload: { id, description },
});
export const deleteTask = (id) => ({ type: 'DELETE_TASK', payload: id });
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });

const store = createStore(todoReducer);

export default store;
