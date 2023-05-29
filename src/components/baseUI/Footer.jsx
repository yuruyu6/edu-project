import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Text,
} from '@mantine/core';
import Logo from './Logo';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: '#fff'
  },

  inner: {
    display: 'flex',
    justifyContent: '',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
}));

const AppFooter = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Text fz={14} align="center" py="xl">
        &copy; {new Date().getFullYear()} QuizWizApp
      </Text>
    </div>
  );
};

export default AppFooter;
