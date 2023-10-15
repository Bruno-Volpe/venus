import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/routes'
import { ToastContainer } from 'react-toastify';
import './assets/css/master.css'
import 'react-toastify/dist/ReactToastify.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
    <div>
      <App />
      <ToastContainer />
    </div>
)