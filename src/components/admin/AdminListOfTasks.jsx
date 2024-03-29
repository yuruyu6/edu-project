import {
  ActionIcon,
  Badge,
  Box,
  Center,
  Flex,
  Paper,
  SimpleGrid,
  Text
} from '@mantine/core';
import {
  IconAd2,
  IconArrowBadgeRight,
  IconFileAnalytics,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../utils/api';
import { queryClient } from '../../utils/queryClient';

const getVisibilityText = (visibility) => {
  switch (visibility) {
    case 'Active':
      return 'Активний';
    case 'Draft':
      return 'Чернетка';
    case 'Archived':
      return 'Архівний';
    default:
      return 'Невідомий статус';
  }
};

const AdminListOfTasks = ({ tasks }) => {
  const deleteMutation = useMutation({
    mutationFn: (taskId) => {
      return api.delete(`/Task/DeleteTaskById?taskId=${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('dashboard');
    },
  });

  const onClickDeleteButton = (taskId) => {
    if (confirm('Ви впевнені, що хочете видалити це завдання?')) {
      deleteMutation.mutate(taskId);
    }
  };

  return tasks && tasks.length > 0 ? (
    <SimpleGrid
      mt={24}
      cols={3}
      spacing="lg"
      breakpoints={[
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}
    >
      <Paper component={Link} to="/a/test/create" shadow="xs" p="sm" withBorder>
        <Center
          sx={{
            height: '100%',
            transitionProperty: 'opacity',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',

            '&:hover': {
              opacity: '50%',
            },
          }}
        >
          <IconPlus size={48} color="gray" />
        </Center>
      </Paper>

      {tasks.map(({ task }) => (
        <Paper shadow="xs" p="sm" withBorder key={task.taskId}>
          <Flex align="start">
            <Box>
              <IconArrowBadgeRight
                size={22}
                sx={{ flexGrow: 1 }}
                color="gray"
              />
            </Box>
            <Box w="100%" h="72px">
              <Badge
                color={task.visibility === 'Active' ? 'teal' : 'gray'}
                sx={{ display: 'inline-block', width: '100%' }}
              >
                {getVisibilityText(task.visibility)}
              </Badge>
              <Text size="sm" c="dimmed" fw="bold" lineClamp={1}>
                {task.taskName}
              </Text>
              <Text size="sm" lineClamp={2}>
                {task.taskDescription}
              </Text>
            </Box>
          </Flex>
          <Flex mt={32} justify="end" sx={{ gap: '0.4rem' }}>
            <ActionIcon
              component={Link}
              to={'/a/test/stats/' + task.taskId}
              color="grape"
              variant="light"
            >
              <IconFileAnalytics size={18} />
            </ActionIcon>
            <ActionIcon
              component={Link}
              to={'/a/test/edit/' + task.taskId}
              color="yellow"
              variant="light"
            >
              <IconPencil size={18} />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => onClickDeleteButton(task.taskId)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Flex>
        </Paper>
      ))}
    </SimpleGrid>
  ) : (
    <Flex mt={24} justify="center">
      <Box c="gray.7">
        <Flex justify="center">
          <IconAd2 size={120} />
        </Flex>
        <Text mt={24} fw={500} align="center">
          Завдання відсутні
        </Text>
      </Box>
    </Flex>
  );
};

export default AdminListOfTasks;
