import {
  Accordion,
  ActionIcon,
  Box,
  CopyButton,
  Flex,
  Table,
  Text,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconShare } from '@tabler/icons-react';
import React from 'react';
import StudentsTableTbody from './studentsTable/StudentsTableTbody';
import StudentsTableThead from './studentsTable/StudentsTableThead';

const AccordionControl = (props) => {
  return (
    <Flex align="center">
      <Accordion.Control children={props.children} />
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

const Students = ({ groupsOfStudents }) => {
  return (
    <Box mt={24}>
      <Accordion variant="separated" chevronPosition="left">
        {groupsOfStudents.map((group) => (
          <Accordion.Item key={group.id} value={group.name}>
            <AccordionControl {...group}>{group.name}</AccordionControl>
            <Accordion.Panel>
              {group?.students ? (
                <Table verticalSpacing="xs" fontSize="xs">
                  <StudentsTableThead />
                  <StudentsTableTbody
                    studentsList={group.students.sort(function (a, b) {
                      if (a.firstName < b.firstName) {
                        return -1;
                      }
                      if (a.firstName > b.firstName) {
                        return 1;
                      }
                      return 0;
                    })}
                  />
                </Table>
              ) : (
                <Text color="dimmed" align="center">
                  Студенти відсутні
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

export default Students;
