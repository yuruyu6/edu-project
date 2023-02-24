import { ActionIcon, Box, Button, Flex, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { user } from '../../utils/mocks/mockedData';

const TaskDetails = () => {
  const navigate = useNavigate();
  let { taskId } = useParams();
  const currentTask = user.tasks.find((task) => task.id === Number(taskId));

  if (!currentTask) {
    return <Navigate to="/404" />;
  }

  const handleStartTest = () => {
    /* navigate(`/u/task/${taskId}/test`); */
    console.warn('not implemented yet');
  };

  return (
    currentTask && (
      <>
        <Flex justify="flex-start" align="center">
          <ActionIcon size="lg" variant="outline" onClick={() => navigate(-1)}>
            <IconArrowLeft size={24} />
          </ActionIcon>
          <Text ml={16} fw="bold" fz="lg">
            {currentTask.name}
          </Text>
        </Flex>

        <Box mt={24}>
          <Text>{currentTask.description}</Text>
          <Text>Оцінка: {currentTask.grade || 'Без оцінки'}</Text>
          {currentTask.grade && <Text>Часу витрачено: 45 хв</Text>}
          {!currentTask.grade && (
            <Button color="green" mt={24} onClick={() => handleStartTest()}>
              Розпочати тест
            </Button>
          )}
        </Box>
      </>
    )
  );
};

export default TaskDetails;
