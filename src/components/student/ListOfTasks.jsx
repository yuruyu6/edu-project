import { Box, Button, Flex, Paper, SimpleGrid, Text } from '@mantine/core';
import { IconAd2, IconArrowBadgeRight } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';

const ListOfTasks = ({ tasks }) => {
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
      {tasks.map((task) => (
        <Paper shadow="xs" p="sm" withBorder key={task.id}>
          <Flex align="start">
            <Box>
              <IconArrowBadgeRight
                size={22}
                sx={{ flexGrow: 1 }}
                color="gray"
              />
            </Box>
            <Box w="100%" h="72px">
              <Text size="sm" c="dimmed" fw="bold" lineClamp={1}>
                {task.name}
              </Text>
              <Text size="sm" lineClamp={2}>
                {task.description}
              </Text>
            </Box>
            <Text fw="bold">{task.grade || '?'}</Text>
          </Flex>
          <Flex mt={14} justify="end">
            <Button component={Link} to={'/u/task/' + task.id}>
              Детальніше
            </Button>
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
        <Text mt={24} fw={500} align="center">Доступні завдання відсутні</Text>
      </Box>
    </Flex>
  );
};

export default ListOfTasks;
