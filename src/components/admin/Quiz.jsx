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
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { api } from '../../utils/api';

const Quiz = ({
  questionId,
  questionType,
  questionTitle,
  answers,
  rightAnswer,
}) => {
  const editMutation = useMutation({
    mutationFn: (data) => {
      return api.post(`/Task/UpdateQuestions`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('task');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (questionId) => {
      return api.delete(`/Task/DeleteQuestions?questionIds=${questionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('task');
    },
  });

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      id: questionId,
      questionType: questionType,
      title: questionTitle,
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
      deleteMutation.mutate(questionId);
    }
  };

  const onSubmit = (data) => {
    if (data) {
      editMutation.mutate([
        {
          ...data,
          taskId: data.id,
          answers: data.answers.map((answer) => ({
            answerId: answer.fid,
            text: answer.text,
          })),
        },
      ]);
      console.log([
        {
          ...data,
          taskId: data.id,
          answers: data.answers.map((answer) => ({
            answerId: answer.fid,
            text: answer.text,
          })),
        },
      ]);
    }
  };

  const getQuizEditingFormByType = () => {
    switch (questionType) {
      case 'Single':
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
      case 'Multiple':
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
                    watch('rightAnswer')?.includes(Number(answer.fid)) ? (
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
                placeholder="Додати варіант1"
                icon={<IconSquare size={18} />}
              />
            </Flex>
          </>
        );
      case 'Text':
        return (
          <Box mt={24}>
            <Text fz={14} fw={500} mb={8}>
              Відповідь
            </Text>
            <Input {...register('rightAnswer')} />
          </Box>
        );

      default:
        return <div>Ой! Виникла проблема з питанням</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper mb={24} withBorder p={12}>
        <Flex justify="end" gap={4}>
          <Button color="red" onClick={() => onClickDeleteButton(questionId)}>
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
