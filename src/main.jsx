import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { ToastContainer } from 'react-toastify'
import {store} from './store.js';
import { Provider } from 'react-redux'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <Provider store={store}>
        <App />
        <ToastContainer position='top-center'/>
  </Provider>
  </>,
)
