import {
  ActionIcon,
  Container,
  createStyles,
  Header,
  Menu,
} from '@mantine/core';
import { IconDoorExit, IconUserCircle } from '@tabler/icons-react';
import { useAuth } from '../../utils/hooks/useAuth';
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
      <Container className={classes.header} size="lg">
        <Logo />

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon color="blue" size="lg">
              <IconUserCircle size={18} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              color="red"
              icon={<IconDoorExit size={14} />}
              onClick={() => signout()}
            >
              Вийти
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </Header>
  );
};
