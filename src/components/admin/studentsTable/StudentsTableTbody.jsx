import React from 'react';
import StudentsTableTr from './StudentsTableTr';

const StudentsTableTbody = ({ studentsList }) => {
  return (
    <tbody>
      {studentsList.map((student) => (
        <StudentsTableTr key={student.userId} {...student} />
      ))}
    </tbody>
  );
};

export default StudentsTableTbody;
