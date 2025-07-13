import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Router } from './router';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
