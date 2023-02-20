import { Box, Container } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from './Footer';
import { AppHeader } from './Header';
import PrivateRoute from './PrivateRoute';

const MainLayout = () => {
  return (
    <PrivateRoute>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <AppHeader />
        <Container
          sx={{
            width: '100%',
          }}
        >
          <Outlet />
        </Container>
        <AppFooter />
      </Box>
    </PrivateRoute>
  );
};

export default MainLayout;
