import './App.css';
import { store } from './actions/store';
import { Provider } from 'react-redux';
import DEmployees from './components/DEmployees';
import { Container } from '@mui/material';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
        <Container maxWidth="lg">
          <DEmployees />    
        </Container> 
      <ToastContainer />
    </Provider>
  );
}

export default App;
