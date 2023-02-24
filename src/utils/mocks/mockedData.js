export const user = {
  name: 'Юрій Гром',
  group: 'KI21mc',
  tasks: [
    {
      id: 1,
      name: 'Тест №1',
      description: 'Підключення бібліотек та ініціалізація зміних',
      grade: '65/100',
    },
    {
      id: 2,
      name: 'Тест №2',
      description: 'Заповнення матриці випадковими числами, виведення на екран',
      grade: '75/100',
    },
    { id: 3, name: 'Тест №3', description: 'Встановлення потоків' },
    {
      id: 4,
      name: 'Підсумковий тест',
      description: 'Функція обчислення елементів рядка матриці',
    },
  ],
};

export const tasks = [
  {
    id: 1,
    name: 'Тест №1',
    description: 'Підключення бібліотек та ініціалізація зміних',
    visibility: 'active',
    groupsOfStudents: ['3'],
  },
  {
    id: 2,
    name: 'Тест №2',
    description: 'Заповнення матриці випадковими числами, виведення на екран',
    visibility: 'archived',
    groupsOfStudents: ['1', '3'],
  },
  {
    id: 3,
    name: 'Тест №3',
    description: 'Встановлення потоків',
    visibility: 'archived',
    groupsOfStudents: [],
  },

  {
    id: 4,
    name: 'Підсумковий тест fds fa fdsf asfsdfsd afd fas fd',
    description: 'Функція обчислення елементів рядка матриці',
    visibility: 'active',
    groupsOfStudents: ['2', '1', '3'],
  },
];

export const groupsOfStudents = [
  { value: '1', label: 'КІ-21мс' },
  { value: '2', label: 'БІ-21м' },
  { value: '3', label: 'А-21' },
  { value: '4', label: 'КІ-20' },
];

export const quizzes = [
  {
    id: 1,
    type: 'single',
    title: 'Geography quiz',
    answers: [
      {
        fid: 1,
        text: 'Europe',
      },
      {
        fid: 2,
        text: 'Asia',
      },
      {
        fid: 3,
        text: 'Africa',
      },
      {
        fid: 4,
        text: 'Australia',
      },
    ],
    rightAnswer: 4,
  },
  {
    id: 2,
    type: 'multiple',
    title: 'Fruits quiz',
    answers: [
      {
        fid: 1,
        text: 'Apple',
      },
      {
        fid: 2,
        text: 'Banana',
      },
      {
        fid: 3,
        text: 'Watermelon',
      },
      {
        fid: 4,
        text: 'Orange',
      },
      {
        fid: 5,
        text: 'Pear',
      },
    ],
    rightAnswer: [1, 5],
  },
  {
    id: 3,
    type: 'text',
    title: 'Question about space',
    answers: null,
    rightAnswer: 'Sun',
  },
];
