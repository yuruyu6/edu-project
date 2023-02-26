import { ActionIcon, Flex, Input } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react';

const StudentsTableTr = ({ id, name }) => {
  const [editFormData, setEditFormData] = useState({ id, name });

  const onChangeNameInput = (e) => {
    setEditFormData({ ...editFormData, name: e.target.value });
  };

  const onClickEditButton = () => {
    console.log(editFormData, 'submit not implemented yet');
  };

  const onClickDeleteButton = () => {
    console.log(id, 'delete not implemented yet');
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
