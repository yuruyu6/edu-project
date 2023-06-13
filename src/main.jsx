import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './components/baseUI/MainLayout';
import PrivateRoute from './components/baseUI/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateTask from './pages/admin/CreateTask';
import TaskStats from './pages/admin/TaskStats';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Home from './pages/Home';
import { AuthProvider } from './utils/hooks/useAuth';
import { queryClient } from './utils/queryClient';
import Register from './pages/auth/Register';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<MainLayout />}>
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/a" element={<AdminDashboard />} />
          <Route
            path="/a/test/create"
            element={<CreateTask isEditing={false} />}
          />
          <Route
            path="/a/test/edit/:taskId"
            element={<CreateTask isEditing={true} />}
          />
          <Route path="/a/test/stats/:taskId" element={<TaskStats />} />
        </Route>
      </Route>
    </>
  )
);

dayjs.locale('uk');

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider
      theme={{ colorScheme: 'light' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </MantineProvider>
  </QueryClientProvider>
);
