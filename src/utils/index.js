export const filterTasks = (tasks, filter) => {
  if (filter === 'completed') return tasks.filter((task) => !!task.grade);
  if (filter === 'assigned') return tasks.filter((task) => !task.grade);
  return tasks;
};


export const mathUserWithUrl = (user) => {
  switch (user.role) {
    case 'student':
      return '/u';
    case 'admin':
      return '/a';
    default:
      return '/logout';
  }
};