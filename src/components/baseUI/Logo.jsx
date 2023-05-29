import { Box, Text } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Box
      component={Link}
      to="/a"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
      }}
    >
      <IconBook size={32} color="#228be6" />
      <Text
        ml={4}
        fw={700}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
      >
        QuizWiz
      </Text>
    </Box>
  );
};

export default Logo;
