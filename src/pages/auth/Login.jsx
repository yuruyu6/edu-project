import React, { useEffect } from 'react';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Popover,
  Alert,
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../../utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { mathUserWithUrl } from '../../utils';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../utils/api';

const Login = () => {
  let navigate = useNavigate();
  const { user, signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    setError,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (credentials) => {
      return api.post('/User/CheckUserCredentials', credentials);
    },
    onSuccess: ({ data }) => {
      signup({ role: 'admin', ...data.data.userInfo });
    },
    onError: () => {
      setError('root.serverError', {
        type: '400',
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (user) {
      navigate(mathUserWithUrl(user));
    }
  }, [user]);

  return (
    <Container size={420} my={40}>
      <Title align="center">Вітаємо!</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={50} radius="md">
          <TextInput
            label="Email"
            placeholder="me@vntu.edu.ua"
            required
            {...register('login')}
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

          <Button fullWidth mt="xl" type="submit" loading={mutation.isLoading}>
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
