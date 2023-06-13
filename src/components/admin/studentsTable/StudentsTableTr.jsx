import { ActionIcon, Flex, Input } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { api } from '../../../utils/api';
import { queryClient } from '../../../utils/queryClient';

const StudentsTableTr = ({ userId, firstName, lastName, fathersName }) => {
  const editMutation = useMutation({
    mutationFn: ({ userId, name }) => {
      const [firstName, lastName, fathersName] = name.split(' ');
      return api.post('/User/UpdateUserDemographic', {
        userId,
        firstName,
        lastName,
        fathersName: fathersName || '',
        dateOfBirth: '2022-08-08',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries('dashboard');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId) => {
      return api.delete(`/User/DeleteUser?userId=${userId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries('dashboard');
    },
  });

  const [editFormData, setEditFormData] = useState({
    userId,
    name: firstName + ' ' + lastName + ' ' + fathersName,
  });

  const onChangeNameInput = (e) => {
    setEditFormData({ ...editFormData, name: e.target.value });
  };

  const onClickEditButton = () => {
    editMutation.mutate(editFormData);
  };

  const onClickDeleteButton = () => {
    deleteMutation.mutate(userId);
  };

  return (
    <tr>
      <td>
        <Input value={editFormData.name} onChange={onChangeNameInput} />
      </td>
      <td>
        <Flex align="center" justify="end">
          <ActionIcon color="yellow" onClick={() => onClickEditButton()}>
            <IconPencil size={18} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => onClickDeleteButton()}>
            <IconTrash size={18} />
          </ActionIcon>
        </Flex>
      </td>
    </tr>
  );
};

export default StudentsTableTr;
