import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Paper,
  Progress,
  Select,
  SimpleGrid,
  Table,
  Text,
  createStyles,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  groupsOfStudents,
  segmentsStatData,
} from '../../utils/mocks/mockedData';
import dayjs from 'dayjs';

const useStyles = createStyles((theme) => ({
  tdWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',

    '& svg': {
      color: theme.colors.gray[7],
      opacity: 0.75,
    },
  },

  tdNowrap: {
    whiteSpace: 'nowrap',
  },

  tdFullWidth: {
    width: '100%',
  },
  progressLabel: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    fontSize: theme.fontSizes.sm,
  },
  stat: {
    borderBottom: `5px solid`,
    paddingBottom: '4px',
  },
}));

const TaskStats = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [filterByGroup, setFilterByGroup] = useState('1');

  const segments = segmentsStatData.map((segment) => ({
    value: segment.part,
    color: segment.color,
    label: segment.part > 10 ? `${segment.part}%` : undefined,
  }));

  const descriptions = segmentsStatData.map((stat) => (
    <Box
      key={stat.label}
      sx={{ borderBottomColor: stat.color }}
      className={classes.stat}
    >
      <Text tt="uppercase" fz="xs" c="dimmed" fw={700}>
        {stat.label}
      </Text>

      <Group position="apart" align="flex-end" spacing={0}>
        <Text fw={700}>{stat.count}</Text>
        <Text c={stat.color} fw={700} size="sm" className={classes.statCount}>
          {stat.part}%
        </Text>
      </Group>
    </Box>
  ));

  return (
    <div>
      <Box maw={540}>
        <Flex align="center" gap={16}>
          <ActionIcon size="lg" variant="outline" onClick={() => navigate(-1)}>
            <IconArrowLeft size={24} />
          </ActionIcon>
          <Text fw="bold" fz="lg">
            Статистика "@taskName"
          </Text>
          <Select
            placeholder="Оберіть групу"
            value={filterByGroup}
            onChange={(value) => setFilterByGroup(value)}
            data={groupsOfStudents.map((group) => ({
              value: group.id,
              label: group.name,
            }))}
          />
        </Flex>
        <Paper withBorder p="md" radius="md" mt={24}>
          <Group spacing="xs">
            <Text fz="xl" fw={700}>
              30
            </Text>
            <Text>студентів всього</Text>
          </Group>
          <Text c="dimmed" fz="sm">
            Статистика виконання
          </Text>
          <Progress
            sections={segments}
            size={34}
            classNames={{ label: classes.progressLabel }}
            mt={40}
          />
          <SimpleGrid
            cols={3}
            breakpoints={[{ maxWidth: 'xs', cols: 1 }]}
            mt="xl"
          >
            {descriptions}
          </SimpleGrid>
        </Paper>
      </Box>
      <Table striped mt={24}>
        <tbody>
          {groupsOfStudents[0].students.map((student) => (
            <tr key={student.id}>
              <td className={classes.tdFullWidth}>{student.name}</td>
              <td className={classes.tdNowrap}>90/100</td>
              <td className={classes.tdNowrap}>
                {dayjs().format('DD.MM.YYYY, HH:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskStats;
