import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Input,
  MultiSelect,
  Radio,
  Space,
  Text,
  Textarea,
} from '@mantine/core';
import { IconArrowLeft, IconCheck } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NewQuizForm from '../../components/admin/NewQuizForm';
import Quiz from '../../components/admin/Quiz';
import { groupsOfStudents } from '../../utils/mocks/mockedData';

const CreateTask = () => {
  const navigate = useNavigate();
  const [quizzesList, setQuizzesList] = useState([]);

  const { handleSubmit, register, control, formState } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, quiz: quizzesList });
    navigate(-1)
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="space-between">
          <Flex justify="flex-start" align="center">
            <ActionIcon
              size="lg"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <IconArrowLeft size={24} />
            </ActionIcon>
            <Text ml={16} fw="bold" fz="lg">
              Нове завдання
            </Text>
          </Flex>
          <ActionIcon size="lg" color="green" variant="filled" type="submit">
            <IconCheck size={24} />
          </ActionIcon>
        </Flex>

        <Box mt={24}>
          <Space
            sx={(theme) => ({
              height: '2px !important',
              width: '100% !important',
              marginBottom: '16px',
              backgroundColor: theme.colors.gray[3],
            })}
          />
          <Grid columns={7} gutter={24} w="100%">
            <Grid.Col xs={7} sm={2} w="399px">
              <Text fw={700}>Основна інформація</Text>
            </Grid.Col>
            <Grid.Col xs={7} sm={5}>
              <Box>
                <Text fz={14} fw={500} mb={8}>
                  Назва
                </Text>
                <Input {...register('name', { required: true })} />
              </Box>
              <Box mt={14}>
                <Text fz={14} fw={500} mb={8}>
                  Опис
                </Text>
                <Textarea autosize {...register('description')} />
              </Box>
              <Box mt={14}>
                <Text fz={14} fw={500}>
                  Видимість
                </Text>
                <Controller
                  name="visibility"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Radio.Group
                      withAsterisk
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={formState.errors.visibility && 'Оберіть значення'}
                    >
                      <Radio value="active" label="Опублікований" />
                      <Radio value="draft" label="Чернетка" />
                      <Radio value="archived" label="Архівний" />
                    </Radio.Group>
                  )}
                />
              </Box>
              <Box mt={14}>
                <Text fz={14} fw={500} mb={8}>
                  Доступність
                </Text>
                <Controller
                  name="groupsOfStudents"
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      {...field}
                      data={groupsOfStudents.map((group) => ({
                        value: group.id,
                        label: group.name,
                      }))}
                      placeholder="Оберіть групи студентів"
                    />
                  )}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </Box>
      </form>
      <Box mt={24}>
        <Space
          sx={(theme) => ({
            height: '2px !important',
            width: '100% !important',
            marginTop: '24px',
            marginBottom: '16px',
            backgroundColor: theme.colors.gray[3],
          })}
        />
        <Grid columns={7} gutter={24} w="100%">
          <Grid.Col xs={7} sm={2}>
            <Text fw={700}>Тест</Text>
            <Text mt={16} fz="sm" c="dimmed">
              Налаштуйте питання тесту: вкажіть їх назву, оберіть тип запитання,
              вкажіть правильні відповіді для автоматичної перевірки
            </Text>
          </Grid.Col>
          <Grid.Col xs={7} sm={5}>
            {quizzesList.map((quiz) => (
              <Quiz key={quiz.id} setQuizzesList={setQuizzesList} {...quiz} />
            ))}
            <NewQuizForm setQuizzesList={setQuizzesList} />
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

export default CreateTask;
