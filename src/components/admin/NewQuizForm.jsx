import { Button, Flex, LoadingOverlay, Paper, Text } from '@mantine/core';
import {
  IconCircleDot,
  IconSquareCheck,
  IconTypography,
} from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../utils/api';
import { queryClient } from '../../utils/queryClient';

const NewQuizForm = ({ taskId }) => {
  const addMutation = useMutation({
    mutationFn: (questionType) => {
      return api.post('/Task/CreateQuestions', [
        {
          questionType: questionType,
          questionTitle: 'Вкажіть питання',
          taskId: taskId,
        },
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('task');
    },
  });

  const onClickAddSingleQuizButton = () => {
    addMutation.mutate('Single');
  };

  const onClickAddMultipleQuizButton = () => {
    addMutation.mutate('Multiple');
  };

  const onClickAddShortQuizButton = () => {
    addMutation.mutate('Text');
  };

  return (
    <Paper withBorder py={48} pos="relative">
      <LoadingOverlay visible={addMutation.isLoading} overlayBlur={2} />
      <Text align="center" mb={24} fw="500">
        Оберіть тип нового запитання
      </Text>
      <Flex justify="space-around" gap="xs" wrap="wrap">
        <Button
          leftIcon={<IconCircleDot />}
          size="xs"
          variant="outline"
          onClick={() => onClickAddSingleQuizButton()}
        >
          Одна відповідь
        </Button>
        <Button
          leftIcon={<IconSquareCheck />}
          size="xs"
          variant="outline"
          onClick={() => onClickAddMultipleQuizButton()}
        >
          Декілька відповідей
        </Button>
        <Button
          leftIcon={<IconTypography />}
          size="xs"
          variant="outline"
          onClick={() => onClickAddShortQuizButton()}
        >
          Коротка відповідь
        </Button>
      </Flex>
    </Paper>
  );
};

export default NewQuizForm;
