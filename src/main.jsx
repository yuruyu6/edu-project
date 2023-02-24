import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import TaskDetails from './pages/student/TaskDetails';
import StudentDashboard from './pages/student/StudentDashboard';
import { AuthProvider } from './utils/hooks/useAuth';
import MainLayout from './components/baseUI/MainLayout';
import PrivateRoute from './components/baseUI/PrivateRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateTask from './pages/admin/CreateTask';
import EditTask from './pages/admin/EditTask';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<MainLayout />}>
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route path="/a" element={<AdminDashboard />} />
          <Route path="/a/test/create" element={<CreateTask />} />
          <Route path="/a/test/edit/:taskId" element={<EditTask />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path="/u" element={<StudentDashboard />} />
          <Route path="/u/task/:taskId" element={<TaskDetails />} />
        </Route>
      </Route>
    </>
  )
);

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
