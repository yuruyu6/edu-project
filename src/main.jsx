import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import { AuthProvider } from './utils/hooks/useAuth';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: '/',    
    children: [
      {
        index: true,
        element: <App />,
        /* children: [
          {
            index: true,
            element: <div>dsdsdsdstesst</div>,
          }
        ] */
      },
    ],
  },
  {
    element: <Login />,
    path: '/login',
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: 'light' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
);
