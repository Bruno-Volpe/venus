import React from "react";
import Routes from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css'


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes />
    </div>
  );
}

export default App;