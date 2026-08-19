import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { DemoProvider } from './context/DemoContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>

            <DemoProvider>
                <App />
            </DemoProvider>

            <ToastContainer
                position="bottom-right"
                theme="light"
            />

        </BrowserRouter>
    </React.StrictMode>,
)