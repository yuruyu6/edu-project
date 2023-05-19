import {
  Accordion,
  ActionIcon,
  Box,
  CopyButton,
  Flex,
  Table,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconShare } from '@tabler/icons-react';
import React from 'react';
import { groupsOfStudents } from '../../utils/mocks/mockedData';
import StudentsTableTbody from './studentsTable/StudentsTableTbody';
import StudentsTableThead from './studentsTable/StudentsTableThead';

const AccordionControl = (props) => {
  return (
    <Flex align="center">
      <Accordion.Control {...props} />
      <Box mr={12}>
        <CopyButton value={props.inviteCode} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? 'Скопійовано!' : 'Код доступу'}
              withArrow
              position="right"
            >
              <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                {copied ? <IconCheck size={16} /> : <IconShare size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Box>
    </Flex>
  );
};

const Students = () => {
  return (
    <Box mt={24}>
      <Accordion variant="separated" chevronPosition="left">
        {groupsOfStudents.map((group) => (
          <Accordion.Item key={group.id} value={group.id}>
            <AccordionControl {...group}>{group.name}</AccordionControl>
            <Accordion.Panel>
              <Table verticalSpacing="xs" fontSize="xs">
                <StudentsTableThead />
                <StudentsTableTbody studentsList={group.students} />
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

export default Students;
