import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  Group,
  Input,
  Loader,
  MultiSelect,
  NumberInput,
  Radio,
  Select,
  Space,
  Stack,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import {
  IconAlertCircle,
  IconAmpersand,
  IconArrowLeft,
  IconCheck,
  IconSectionSign,
} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import NewQuizForm from '../../components/admin/NewQuizForm';
import Quiz from '../../components/admin/Quiz';
import { groupsOfStudents } from '../../utils/mocks/mockedData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../../utils/api';

const CreateTask = ({ isEditing }) => {
  let { taskId } = useParams();
  const navigate = useNavigate();
  const [quizzesList, setQuizzesList] = useState([]);
  const { handleSubmit, register, control, formState, reset } = useForm({
    defaultValues: {
      visibility: 'Active',
      oneQuestionTime: 60,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'topics',
  });

  useQuery({
    enabled: !!isEditing,
    queryKey: ['task'],
    queryFn: () => {
      return api.get(`/Task/GetTaskById?taskId=${taskId}`);
    },
    onSuccess: ({ data }) => {
      const taskData = data.data;
      reset({
        ...data.data.task,
        startTime: new Date(data.data.task.startTime),
        assignedGroups: taskData.assignedGroups,
        topics: taskData.task.topics.map((topic) => ({
          value: topic.trim(),
        })),
      });
    },
  });

  const { data: groupList } = useQuery({
    queryKey: ['groupList'],
    queryFn: () => {
      return api.get(`/Group/GetAllGroupsList`);
    },
    select: ({ data }) => {
      return data.data.map((group) => ({ value: group.id, label: group.name }));
    },
  });

  const { data: subjectList } = useQuery({
    queryKey: ['subjectList'],
    queryFn: () => {
      return api.get(`/Subject/GetAllSubjects`);
    },
    select: ({ data }) => {
      return data.data.map((subject) => ({
        value: subject.subjectId,
        label: subject.subjectLongName,
      }));
    },
  });

  const createMutation = useMutation({
    mutationFn: (formData) => {
      return api.post('/Task/CreateTask', {
        ...formData,
        topics: formData.topics.map((topic) => topic.value),
        maxPoints: 100,
        startTime: new Date(),
      });
    },
    onSuccess: () => {
      navigate('/a');
    },
  });

  const editMutation = useMutation({
    mutationFn: (formData) => {
      return api.post('/Task/UpdateTask', {
        ...formData,
        topics: formData.topics.map((topic) => topic.value),
      });
    },
    onSuccess: () => {
      navigate('/a');
    },
  });

  const onClickTopicDeleteButton = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    if (isEditing) {
      editMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
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
              {isEditing ? 'Редагувати завдання' : ' Нове завдання'}
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
              <Group grow>
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Назва*
                  </Text>
                  <Input {...register('taskName', { required: true })} />
                </Box>
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Предмет*
                  </Text>
                  <Controller
                    name="subjectId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Select
                        placeholder="Оберіть предмет"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        data={subjectList || []}
                        error={
                          formState.errors.visibility && 'Оберіть значення'
                        }
                      />
                    )}
                  />
                </Box>
              </Group>
              <Box mt={14}>
                <Text fz={14} fw={500} mb={8}>
                  Опис
                </Text>
                <Textarea autosize {...register('taskDescription')} />
              </Box>

              <Box mt={14}>
                <Text fz={14} fw={500} mb={8}>
                  Теми
                </Text>
                <Stack direction="vertical" spacing="xs">
                  {fields.map((field, index) => (
                    <Input
                      key={field.id}
                      icon={<IconSectionSign size={18} />}
                      placeholder="Вкажіть назву теми"
                      {...register(`topics.${index}.value`)}
                      rightSection={
                        <CloseButton
                          onClick={() => onClickTopicDeleteButton(index)}
                        />
                      }
                    />
                  ))}
                  <Input
                    onClick={() => append()}
                    sx={{
                      cursor: 'pointer',
                      opacity: 0.5,
                      transitionProperty: 'opacity',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDuration: '150ms',

                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                    icon={<IconSectionSign size={18} />}
                    placeholder="Додати нову тему"
                    readOnly
                  />
                </Stack>
              </Box>

              <Group grow mt={14}>
                <Box>
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
                        error={
                          formState.errors.visibility && 'Оберіть значення'
                        }
                      >
                        <Group mt="lg">
                          <Radio value="Active" label="Опублікований" />
                          <Radio value="Draft" label="Чернетка" />
                          <Radio value="Archived" label="Архівний" />
                        </Group>
                      </Radio.Group>
                    )}
                  />
                </Box>
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Доступність
                  </Text>
                  <Controller
                    name="assignedGroups"
                    control={control}
                    render={({ field }) => (
                      <MultiSelect
                        {...field}
                        data={groupList || []}
                        placeholder="Оберіть групи студентів"
                      />
                    )}
                  />
                </Box>
              </Group>
              <Group grow mt={14}>
                <Box>
                  <Text fz={14} fw={500}>
                    Запланувати
                  </Text>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <DateTimePicker
                        w="100%"
                        locale="uk"
                        mt="xs"
                        clearable
                        placeholder="Оберіть дату початку тесту"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Час на питання (секунд)
                  </Text>
                  <Controller
                    name="oneQuestionTime"
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        name="oneQuestionTime"
                        defaultValue={60}
                        step={5}
                        placeholder="Вкажіть час на питання (в секундах)"
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Group>
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
          <Grid.Col
            xs={7}
            sm={5}
            style={{ display: 'grid', placeItems: 'center' }}
          >
            <Title order={5} color="dimmed">
              Розділ стане доступним після створення тесту
            </Title>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

export default CreateTask;
