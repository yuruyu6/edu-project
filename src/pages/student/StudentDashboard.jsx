import {
  Box,
  Button,
  Center,
  createStyles,
  Flex,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Text,
} from '@mantine/core';
import {
  IconArrowBadgeRight,
  IconZoomCheck,
  IconZoomExclamation,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ListOfTasks from '../../components/student/ListOfTasks';
import { user } from '../../utils/mocks/mockedData';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: 'transperent',
  },
  label: {
    fontSize: theme.fontSizes.xs,
  },
  control: {
    backgroundColor: 'transperent',
    borderWidth: '0 0 2px 0 !important',
    borderStyle: 'solid',
    borderColor: theme.colors.gray[2] + ' !important',
    borderRadius: '0',
  },
  controlActive: {
    backgroundColor: 'transperent',
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
        <Box ml={8}>З оцінкою</Box>
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
       <ListOfTasks tasks={tasksList} />
      </Box>
    </>
  );
};

export default StudentDashboard;
