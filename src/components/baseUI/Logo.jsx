import { Box, Text } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import React from 'react';
import { mathUserWithUrl } from '../../utils';
import { useAuth } from '../../utils/hooks/useAuth';

const Logo = () => {
  const { user } = useAuth();

  return (
    <Box
      component="a"
      href={mathUserWithUrl(user)}
      sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
    >
      <IconBook size={32} color="#228be6" />
      <Text
        ml={4}
        fw={700}
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
      >
        TESTIFY
      </Text>
    </Box>
  );
};

export default Logo;
