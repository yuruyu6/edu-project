import { Box, Table, Text, createStyles } from '@mantine/core';
import React from 'react';

const lessonsTime = [
  '08:15 - 09:00',
  '09:15 - 10:00',
  '10:15 - 11:00',
  '11:15 - 12:00',
  '12:15 - 13:00',
  '13:15 - 14:00',
  '14:15 - 15:00',
  '15:10 - 15:55',
  '16:05 - 16:50',
  '17:00 - 17:45',
  '17:55 - 18:40',
  '18:50 - 19:35',
];

const scheduleElements = [
  {
    dayOfWeek: 'Понеділок',
    subjects: [
      '',
      '',
      '',
      "Сучасні інформаційні технології в комп'ютерній інженерії",
      "Сучасні інформаційні технології в комп'ютерній інженерії",
      'Програмування мікропроцесорів та мікроконтролерів',
      'Програмування мікропроцесорів та мікроконтролерів',
    ],
  },
  {
    dayOfWeek: 'Вівторок',
    subjects: [
      "Сучасні інформаційні технології в комп'ютерній інженерії",
      "Сучасні інформаційні технології в комп'ютерній інженерії",
      "Сучасні інформаційні технології в комп'ютерній інженерії",
      "Сучасні інформаційні технології в комп'ютерній інженерії",
    ],
  },
  {
    dayOfWeek: 'Середа',
    subjects: [
      '',
      '',
      '',
      '',
      '',
      'Програмування мікропроцесорів та мікроконтролерів',
      'Програмування мікропроцесорів та мікроконтролерів',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
    ],
  },
  {
    dayOfWeek: 'Четвер',
    subjects: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
    ],
  },
  {
    dayOfWeek: "П'ятниця",
    subjects: [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
      'Сучасні інформаційні технології в комп`ютерній інженерії',
    ],
  },
];

const useStyles = createStyles((theme) => ({
  tableColumn: {
    minWidth: '190px',
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
    width: '100%',
  },
}));

const LessonsSchedule = () => {
  const { classes } = useStyles();

  const rows = lessonsTime.map((_, index) => {
    return (
      <tr key={index}>
        <td>
          <Text align="center">{index + 1}.</Text>
          <Text sx={{ whiteSpace: 'nowrap' }} fw={500}>
            {lessonsTime[index]}
          </Text>
        </td>
        <td>{scheduleElements[0].subjects[index]}</td>
        <td>{scheduleElements[1].subjects[index]}</td>
        <td>{scheduleElements[2].subjects[index]}</td>
        <td>{scheduleElements[3].subjects[index]}</td>
        <td>{scheduleElements[4].subjects[index]}</td>
      </tr>
    );
  });

  return (
    <Box mt={24} className={classes.tableWrapper}>
      <Table
        withColumnBorders
        striped
        verticalSpacing="xs"
        className={classes.table}
      >
        <thead>
          <tr>
            <th></th>
            <th className={classes.tableColumn}>Понеділок</th>
            <th className={classes.tableColumn}>Вівторок</th>
            <th className={classes.tableColumn}>Середа</th>
            <th className={classes.tableColumn}>Четвер</th>
            <th className={classes.tableColumn}>П'ятниця</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};

export default LessonsSchedule;
