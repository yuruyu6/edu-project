import { Text } from '@mantine/core';
import React from 'react';
import AdminListOfTasks from '../../components/admin/AdminListOfTasks';
import { tasks } from '../../utils/mocks/mockedData';

const AdminDashboard = () => {
  return (
    <>
      <Text size="xl" weight={700}>
        Матеріали
      </Text>
      <AdminListOfTasks tasks={tasks} />
      <Text size="xl" weight={700} mt={24}>
        Статистика
      </Text>
      <Text mt={24}>Not implemented yet</Text>
    </>
  );
};

export default AdminDashboard;
