import { Flex, Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdminListOfTasks from '../../components/admin/AdminListOfTasks';
import DashboardStats from '../../components/admin/DashboardStats';
import LessonsSchedule from '../../components/admin/LessonsSchedule';
import Students from '../../components/admin/Students';
import { api } from '../../utils/api';

const AdminDashboard = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => {
      return api.get('/AdminPanel/GetOverviewInfo');
    },
  });

  if (isLoading || isError) {
    return (
      <Flex justify="center" mt={4}>
        <Loader size="xl" variant="dots" />
      </Flex>
    );
  }

  const responce = data.data.data;

  return (
    <>
      <Text size="xl" weight={700}>
        Матеріали
      </Text>
      <AdminListOfTasks tasks={responce.tasks} />
      <Text size="xl" weight={700} mt={24}>
        Статистика
      </Text>
      <DashboardStats />
      <Text size="xl" weight={700} mt={24}>
        Студенти
      </Text>
      <Students groupsOfStudents={responce.groups} />
      <Text size="xl" weight={700} mt={24}>
        Розклад занять
      </Text>
      <LessonsSchedule />
    </>
  );
};

export default AdminDashboard;
