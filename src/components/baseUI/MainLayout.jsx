import { Box, Container } from '@mantine/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppFooter from './Footer';
import { AppHeader } from './Header';

const MainLayout = () => {
  return (
    <Box
      sx={() => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      <AppHeader />
      <Container
        size="lg"
        sx={{
          width: '100%',
          marginBottom: '48px',
        }}
      >
        <Outlet />
      </Container>
      <AppFooter />
    </Box>
  );
};

export default MainLayout;
