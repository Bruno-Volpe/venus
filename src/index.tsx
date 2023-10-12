import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/routes'
import './assets/css/master.css'
import "primereact/resources/primereact.min.css"                
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"
import 'primeicons/primeicons.css'
import 'react-toastify/dist/ReactToastify.css'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
 
    <App />
  
)