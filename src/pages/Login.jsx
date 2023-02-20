import React, { useEffect } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Popover,
  Alert,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const usersList = [
  { username: 'admin@gmail.com', password: 'admin', role: 'admin' },
  {
    username: 'user@gmail.com',
    password: 'user',
    role: 'student',
  },
];

const Login = () => {
  let navigate = useNavigate();
  const { user, signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm();

  const onSubmit = (data) => {
    try {
      const findedUser = usersList.find((user) => user.username === data.email);
      if (findedUser) {
        signup(findedUser);
        navigate('/');
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      setError('root.serverError', {
        type: '400',
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user])
  

  return (
    <Container size={420} my={40}>
      <Title align="center">Вітаємо!</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={50} radius="md">
          <TextInput
            label="Email"
            placeholder="me@vntu.edu.ua"
            required
            {...register('email')}
          />
          <PasswordInput
            label="Пароль"
            placeholder="Ваш пароль"
            required
            mt="md"
            {...register('password')}
          />
          <Popover width={255} position="right-end" withArrow shadow="md">
            <Popover.Target>
              <Text align="right" mt="lg">
                <Anchor
                  onClick={(event) => event.preventDefault()}
                  href="#"
                  size="sm"
                >
                  Забули пароль?
                </Anchor>
              </Text>
            </Popover.Target>
            <Popover.Dropdown bg="gray.8" c="white">
              <Text size="sm">
                Для відновлення паролю зверніться до викладача або
                адміністратора
              </Text>
            </Popover.Dropdown>
          </Popover>

          <Button fullWidth mt="xl" type="submit">
            Вхід
          </Button>
          {!isValid && (
            <Alert
              mt="md"
              icon={<IconAlertCircle size={16} />}
              title="Ой!"
              color="red"
            >
              Щось пішло не так. Перевірте введені дані та спробуйте ще раз.
            </Alert>
          )}
        </Paper>
      </form>
    </Container>
  );
};

export default Login;
