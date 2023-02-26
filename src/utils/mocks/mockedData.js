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
    groupsOfStudents: ['2'],
  },
  {
    id: 2,
    name: 'Тест №2',
    description: 'Заповнення матриці випадковими числами, виведення на екран',
    visibility: 'archived',
    groupsOfStudents: ['1', '2'],
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
    groupsOfStudents: ['2', '1'],
  },
];

/* export const groupsOfStudents = [
  { value: '1', label: 'КІ-21мс' },
  { value: '2', label: 'БІ-21м' },
  { value: '3', label: 'А-21' },
  { value: '4', label: 'КІ-20' },
]; */

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

export const groupsOfStudents = [
  {
    id: '1',
    name: 'КІ-21мс',
    inviteCode: '123456',
    students: [
      { name: 'Бабій Андрій Юрійович', id: 54 },
      { name: 'Басістий Міхаіл Юрійович', id: 55 },
      { name: 'Борщевський Максим Сергійович', id: 56 },
      { name: 'Бровченко Валерій Вікторович', id: 57 },
      { name: 'Бузинюк Дмитро Миколайович', id: 58 },
      { name: 'Гром Юрій Святославович', id: 59 },
      { name: 'Дзюба Дар’я Анатоліївна', id: 60 },
      { name: 'Дунський Василь Станіславович', id: 61 },
      { name: 'Любарський Богдан Андрійович', id: 62 },
      { name: 'Мельничук Владислав Андрійович', id: 63 },
      { name: 'Редич Денис Володимирович', id: 64 },
      { name: 'Рейпаші Олексій Володимирович', id: 65 },
      { name: 'Рогозянський В’ячеслав Андрійович', id: 66 },
      { name: 'Слободянюк Віталій Олександрович', id: 67 },
      { name: 'Стрілковський Вадим Сергійович', id: 68 },
      { name: 'Тарасюк Владислав Юрійович', id: 69 },
      { name: 'Ткачов Олександр Олександрович', id: 70 },
      { name: 'Фічковський Дмитро Анатолійович', id: 71 },
      { name: 'Чоботар Артур Володимирович', id: 72 },
      { name: 'Ярошевський Олександр Олександрович', id: 73 },
      { name: 'Яцина Ангеліна Юріївна', id: 74 },
    ],
  },
  {
    id: '2',
    name: 'КІ-21мсз',
    inviteCode: 'JDH2bSl32p',
    students: [
      {
        name: 'Андрощук Данило Андрійович',
        id: 75,
      },
      {
        name: 'Бакута Віталій Валерійович',
        id: 76,
      },
      {
        name: 'Барабаш Валерія Валеріївна',
        id: 77,
      },
      {
        name: 'Василик Вадим Олександрович',
        id: 78,
      },
      {
        name: 'Дмухайло Олександра Віталіївна',
        id: 79,
      },
      {
        name: 'Єндовицький Андрій Юрійович',
        id: 80,
      },
      {
        name: 'Заверуха Дмитро Русланович',
        id: 81,
      },
      {
        name: 'Кохан Каріна Петрівна',
        id: 82,
      },
      {
        name: 'Кузьменко Євгеній Васильович',
        id: 83,
      },
      {
        name: 'Ляховецький Денис Сергійович',
        id: 84,
      },
      {
        name: 'Мазуркевич Сергій Іванович',
        id: 85,
      },
      {
        name: 'Непеляк Софія Михайлівна',
        id: 86,
      },
      {
        name: 'Федорчук Роман Сергійович',
        id: 87,
      },
      {
        name: 'Шевчук Дмитро Ігорович',
        id: 88,
      },
    ],
  },
];
