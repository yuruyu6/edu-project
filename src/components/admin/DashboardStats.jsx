import { Box, Table, Text, createStyles } from '@mantine/core';
import React from 'react';
import { dashboardStatsData } from '../../utils/mocks/mockedData';
import dayjs from 'dayjs';
import {
  IconCalendarTime,
  IconClipboardCheck,
  IconClock,
} from '@tabler/icons-react';

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
}));

const DashboardStats = () => {
  const { classes, cx } = useStyles();

  return (
    <Box mt={24}>
      <Table>
        <tbody>
          {dashboardStatsData.map((item) => (
            <tr key={item.id}>
              <td className={classes.tdWithIcon}>
                <IconCalendarTime size={16} />{' '}
                {dayjs(item.createdAt).format('DD.MM.YYYY, HH:mm')}
              </td>
              <td>
                {item.group}
                <Text fw={600}> {item.studentName}</Text>
              </td>
              <td>{item.testName}</td>
              <td className={classes.tdWithIcon}>
                <IconClipboardCheck size={16} />
                <Text fw={600}>{item.grade}</Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default DashboardStats;
