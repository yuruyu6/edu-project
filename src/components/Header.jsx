import {
  createStyles,
  Header,
  Container,
  Group,
  Text,
  Avatar,
  Box,
} from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import { useAuth } from '../utils/hooks/useAuth';
import Logo from './Logo';

const useStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}));

export const AppHeader = () => {
  const { classes } = useStyles();
  const { signout } = useAuth();

  return (
    <Header height={60} mb={20}>
      <Container className={classes.header}>
        <Logo />

        <Group spacing={5}>
          <Avatar color="cyan" radius="xl" onClick={() => signout()} />
        </Group>
      </Container>
    </Header>
  );
};
