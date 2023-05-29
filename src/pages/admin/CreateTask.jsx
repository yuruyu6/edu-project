import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Flex,
  Grid,
  Group,
  Input,
  MultiSelect,
  NumberInput,
  Radio,
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
import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NewQuizForm from '../../components/admin/NewQuizForm';
import Quiz from '../../components/admin/Quiz';
import { groupsOfStudents } from '../../utils/mocks/mockedData';

const CreateTask = () => {
  const navigate = useNavigate();
  const [quizzesList, setQuizzesList] = useState([]);

  const { handleSubmit, register, control, formState } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'topics',
    }
  );

  const onClickTopicDeleteButton = (index) => {
    remove(index);
  };

  const onSubmit = (data) => {
    console.log({ ...data, quiz: quizzesList });
    navigate(-1);
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
              <Group grow>
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Назва
                  </Text>
                  <Input {...register('name', { required: true })} />
                </Box>
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Предмет
                  </Text>
                  <Input {...register('subject', { required: true })} />
                </Box>
              </Group>
              <Box mt={14}>
                <Text fz={14} fw={500} mb={8}>
                  Опис
                </Text>
                <Textarea autosize {...register('description')} />
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
                          onClick={() => onClickTopicDeleteButton(field.id)}
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
                          <Radio value="active" label="Опублікований" />
                          <Radio value="draft" label="Чернетка" />
                          <Radio value="archived" label="Архівний" />
                        </Group>
                      </Radio.Group>
                    )}
                  />
                </Box>
                <Box>
                  <Text fz={14} fw={500}>
                    Запланувати
                  </Text>
                  <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: true }}
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
              </Group>
              <Group grow mt={14}>
                <Box>
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
                <Box>
                  <Text fz={14} fw={500} mb={8}>
                    Час на питання (секунд)
                  </Text>
                  <Controller
                    name="timeForQuestion"
                    control={control}
                    render={({ field }) => (
                      <NumberInput
                        name="timeForQuestion"
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
