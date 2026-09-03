import './App.css';
import { Provider } from 'react-redux';
import Addtask from './components/Addtask';
import ListTask from './components/ListTask';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <main className="app-shell">
        <div className="app-shell__content">
          <header className="app-header">
            <div>
              <p className="eyebrow">A quiet place to focus</p>
              <h1>Today, made lighter.</h1>
            </div>
            <span className="app-header__date">Task board</span>
          </header>
          <Addtask />
          <ListTask />
        </div>
      </main>
    </Provider>
  );
}

export default App;
