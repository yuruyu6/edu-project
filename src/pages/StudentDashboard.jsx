import {
    Box,
    Center,
    Container,
    createStyles,
    SegmentedControl,
    Text,
  } from '@mantine/core';
  import { IconZoomCheck, IconZoomExclamation } from '@tabler/icons-react';
  import { useState } from 'react';
  
  const user = {
    name: 'Юрій Гром',
    group: 'KI21mc',
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        description: 'Підключення бібліотек та ініціалізація зміних',
        grade: '65/100',
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'Заповнення матриці випадковими числами, виведення на екран',
        grade: '75/100',
      },
      { id: 3, name: 'Task 3', description: 'Встановлення потоків' },
      {
        id: 4,
        name: 'Task 4',
        description: 'Функція обчислення елементів рядка матриці',
      },
    ],
  };
  
  const useStyles = createStyles((theme) => ({
    root: {
      backgroundColor: '#fff',
    },
    label: {
      fontSize: theme.fontSizes.xs,
    },
    control: {
      backgroundColor: '#fff',
      borderWidth: '0 0 2px 0 !important',
      borderStyle: 'solid',
      borderColor: theme.colors.gray[2] + ' !important',
      borderRadius: '0',
    },
    controlActive: {
      backgroundColor: '#fff',
      borderWidth: '0 0 2px 0 !important',
      borderStyle: 'solid',
      borderColor: theme.colors.blue[6] + ' !important',
      borderRadius: '0',
    },
    active: {
      boxShadow: 'none',
    },
  }));
  
  const segmentValues = [
    {
      label: (
        <Center>
          <Box>Всі</Box>
        </Center>
      ),
      value: 'all',
    },
    {
      label: (
        <Center>
          <IconZoomCheck size={16} />
          <Box ml={8}>Завершені</Box>
        </Center>
      ),
      value: 'completed',
    },
    {
      label: (
        <Center>
          <IconZoomExclamation size={16} />
          <Box ml={8}>Призначені</Box>
        </Center>
      ),
      value: 'assigned',
    },
  ];
  
  const StudentDashboard = () => {
    const { classes } = useStyles();
    const [selectedSegment, setSelectedSegment] = useState(segmentValues[0]);
    const [tasksList, setTasksList] = useState(user.tasks);
  
    const onChangeSegment = (value) => {
      setSelectedSegment(
        segmentValues.find((segment) => segment.value === value)
      );
      switch (value) {
        case 'all':
          setTasksList(user.tasks);
          break;
        case 'completed':
          setTasksList(user.tasks.filter((task) => task.grade));
          break;
        case 'assigned':
          setTasksList(user.tasks.filter((task) => !task.grade));
          break;
        default:
          setTasksList(user.tasks);
          break;
      }
    };
  
    return (
      <>
        <Text
          size="xs"
          sx={{ textTransform: 'uppercase' }}
          weight={700}
          color="dimmed"
        >
          {user.group}
        </Text>
        <Text size="lg" weight={500}>
          🎓 {user.name}
        </Text>
  
        <Box mt={24}>
          <Text size="sm" weight={700}>
            Завдання
          </Text>
          <SegmentedControl
            classNames={{
              root: classes.root,
              label: classes.label,
              control: classes.control,
              controlActive: classes.controlActive,
              active: classes.active,
            }}
            value={selectedSegment.value}
            onChange={onChangeSegment}
            data={segmentValues}
          />
          {tasksList.map((task) => (
            <Box key={task.id}>
              <p>{task.name}</p>
            </Box>
          ))}
        </Box>
      </>
    );
  };
  
  export default StudentDashboard;
  