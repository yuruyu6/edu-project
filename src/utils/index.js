export const filterTasks = (tasks, filter) => {
  if (filter === 'completed') return tasks.filter((task) => !!task.grade);
  if (filter === 'assigned') return tasks.filter((task) => !task.grade);
  return tasks;
};
