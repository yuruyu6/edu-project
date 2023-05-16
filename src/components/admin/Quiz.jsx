import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Input,
  Paper,
  Text,
  Textarea,
} from '@mantine/core';
import {
  IconCheck,
  IconCircle,
  IconCircleDot,
  IconCircleDotFilled,
  IconPencil,
  IconReplace,
  IconSquare,
  IconSquareCheck,
  IconSquareCheckFilled,
  IconTrash,
  IconTrashX,
  IconX,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const Quiz = ({ id, type, title, answers, rightAnswer, setQuizzesList }) => {
  const [isEditing, setIsEditing] = useState(true);
  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { isDirty, isSubmitted },
  } = useForm({
    defaultValues: {
      id: id,
      type: type,
      title: title,
      answers: answers,
      rightAnswer: rightAnswer,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  });

  const onClickAddAnswerButton = (e) => {
    e.preventDefault();
    append({ fid: Date.now(), text: '' });
  };

  const onClickSetRightAnswerButtonForSingle = (e, id) => {
    e.preventDefault();
    setValue('rightAnswer', id, {
      shouldDirty: true,
    });
  };

  const onClickSetRightAnswerButtonForMultiple = (e, id) => {
    console.log(id);
    e.preventDefault();
    const currentRightAnswers = watch('rightAnswer') || [];

    if (currentRightAnswers.includes(id)) {
      setValue(
        'rightAnswer',
        currentRightAnswers.filter((answerId) => answerId !== id),
        {
          shouldDirty: true,
        }
      );
    } else {
      console.log([...currentRightAnswers, id]);
      setValue('rightAnswer', [...currentRightAnswers, id], {
        shouldDirty: true,
      });
    }
  };

  const onClickDeleteButton = () => {
    if (window.confirm('Ви впевнені?')) {
      setQuizzesList((prev) => prev.filter((quiz) => quiz.id !== id));
    }
  };

  /*   const deleteEmptyAnswers = () => {
    answers.forEach((answer, index) => {
      if (answer.text === '') {
        remove(index);
      }
    });
  }; */

  const onSubmit = (data) => {
    if (data) {
      setQuizzesList((prev) => {
        const updatedQuizzes = prev.map((quiz) => {
          if (quiz.id === id) {
            return { ...data };
          }
          return quiz;
        });
        return updatedQuizzes;
      });
    }
  };

  const getQuizEditingFormByType = () => {
    switch (type) {
      case 'single':
        return (
          <>
            <Flex align="center" justify="space-between">
              <Text fz={14} fw={500} mb={8} mt={24}>
                Варіанти відповідей
              </Text>
            </Flex>
            {fields.map((answer, index) => (
              <Flex align="center" gap="sm" key={answer.id}>
                <ActionIcon
                  color="blue"
                  variant="light"
                  onClick={(e) => {
                    console.log(answer);
                    onClickSetRightAnswerButtonForSingle(e, answer.fid);
                  }}
                  type="submit"
                >
                  <IconReplace size={18} />
                </ActionIcon>
                <Input
                  mb={4}
                  {...register(`answers.${index}.text`)}
                  icon={
                    watch('rightAnswer') === Number(answer.fid) ? (
                      <IconCircleDotFilled size={18} />
                    ) : (
                      <IconCircle size={18} />
                    )
                  }
                />
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => remove(index)}
                  type="submit"
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Flex>
            ))}
            <Flex
              align="center"
              gap="sm"
              sx={{
                cursor: 'pointer',
                opacity: 0.4,
                transitionProperty: 'opacity',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',

                '&:hover': {
                  opacity: 1,
                },
              }}
              onClick={(e) => onClickAddAnswerButton(e)}
            >
              <ActionIcon color="blue" variant="light" disabled>
                <IconReplace size={18} />
              </ActionIcon>
              <Input
                mb={4}
                readOnly
                placeholder="Додати варіант"
                icon={<IconCircle size={18} />}
              />
            </Flex>
          </>
        );
      case 'multiple':
        return (
          <>
            <Flex align="center" justify="space-between">
              <Text fz={14} fw={500} mb={8} mt={24}>
                Варіанти відповідей
              </Text>
            </Flex>
            {fields.map((answer, index) => (
              <Flex align="center" gap="sm" key={answer.id}>
                <ActionIcon
                  color="blue"
                  variant="light"
                  onClick={(e) =>
                    onClickSetRightAnswerButtonForMultiple(e, answer.fid)
                  }
                  type="submit"
                >
                  <IconReplace size={18} />
                </ActionIcon>
                <Input
                  mb={4}
                  {...register(`answers.${index}.text`)}
                  icon={
                    watch('rightAnswer').includes(Number(answer.fid)) ? (
                      <IconSquareCheckFilled size={18} />
                    ) : (
                      <IconSquare size={18} />
                    )
                  }
                />
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => remove(index)}
                  type="submit"
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Flex>
            ))}
            <Flex
              align="center"
              gap="sm"
              sx={{
                cursor: 'pointer',
                opacity: 0.4,
                transitionProperty: 'opacity',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '150ms',

                '&:hover': {
                  opacity: 1,
                },
              }}
              onClick={(e) => onClickAddAnswerButton(e)}
            >
              <ActionIcon color="blue" variant="light" disabled>
                <IconReplace size={18} />
              </ActionIcon>
              <Input
                mb={4}
                readOnly
                placeholder="Додати варіант"
                icon={<IconSquare size={18} />}
              />
            </Flex>
          </>
        );
      case 'text':
        return (
          <Box mt={24}>
            <Text fz={14} fw={500} mb={8}>
              Відповідь
            </Text>
            <Input {...register('rightAnswer')} />
          </Box>
        );

      default:
        return <div>oops, problem with quiz</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper mb={24} withBorder p={12}>
        <Flex justify="end" gap={4}>
          <Button color="red" onClick={() => onClickDeleteButton(id)}>
            <IconTrashX size={16} />
          </Button>
          <Button
            color="green"
            onClick={() => onSubmit()}
            disabled={!isDirty}
            type="submit"
          >
            Зберегти
          </Button>
        </Flex>
        <Box>
          <Text fz={14} fw={500} mb={8}>
            Питання
          </Text>
          <Textarea autosize {...register('title')} />
        </Box>
        {getQuizEditingFormByType()}
      </Paper>
    </form>
  );
};

export default Quiz;
