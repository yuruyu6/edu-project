import { Button, Flex, Paper, Text } from '@mantine/core';
import {
    IconCircleDot,
    IconSquareCheck,
    IconTypography
} from '@tabler/icons-react';
import React from 'react';

const NewQuizForm = ({ setQuizzesList }) => {
  const onClickAddSingleQuizButton = () => {
    setQuizzesList((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        type: 'single',
        title: undefined,
        answers: [{ fid: Date.now(), text: '' }],
        rightAnswer: undefined,
      },
    ]);
  };

  const onClickAddMultipleQuizButton = () => {
    setQuizzesList((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        type: 'multiple',
        title: undefined,
        answers: [{ fid: Date.now(), text: '' }],
        rightAnswer: [],
      },
    ]);
  };

  const onClickAddShortQuizButton = () => {
    setQuizzesList((prevState) => [
      ...prevState,
      {
        id: Date.now(),
        type: 'text',
        title: undefined,
        answers: undefined,
        rightAnswer: undefined,
      },
    ]);
  };

  return (
    <Paper withBorder py={48}>
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
