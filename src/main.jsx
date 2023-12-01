import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <RouterProvider router={routes}>
          <App />
        </RouterProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode >,
)
