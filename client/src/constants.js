export const PICK_DATE = "PICK_DATE";
export const FETCH_DATA = "FETCH_DATA";
export const ADD_EXERCISE = "ADD_EXERCISE";
export const DROP_DATABASE = "DROP_DATABASE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const CHANGE_NAME = "CHANGE_NAME";
export const ADD_APPROACH = "ADD_APPROACH";
export const DELETE_APPROACH = "DELETE_APPROACH";
export const CHANGE_APPROACH = "CHANGE_APPROACH";
export const EXERCISE_START = "EXERCISE_START";
export const WORKOUT_START = "WORKOUT_START";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const WORKOUT_FINISH = "WORKOUT_FINISH";
export const ADD_PARAM = "ADD_PARAM";
export const USER_SIGNUP = "USER_SIGNUP";
export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const BOOKS_FETCHED = "BOOKS_FETCHED";
export const BOOK_CREATED = "BOOK_CREATED";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
// Расшифровка id: первая цифра -группа,
// вторая - выполняется упражнение с двумя гантелями(2),
// попеременно(1) или без гантелей(0), номер упражнения
// Группы: 1- Спина, 2-Грудь, 3-Дельты, 4-Руки, 5-Ноги, 6-Пресс

export const exerciseList = [
  {
    exId: 1101,
    exGroup: "Спина",
    exerciseName: "Подъем гантели в наклоне"
  },
  {
    exId: 1202,
    exGroup: "Спина",
    exerciseName: "Подъем 2-х гантелей в наклоне"
  },
  {
    exId: 1103,
    exGroup: "Спина",
    exerciseName: "Наклоны вперед с гантелями"
  },
  {
    exId: 2204,
    exGroup: "Грудь",
    exerciseName: "Разведение гантелей лежа"
  },
  {
    exId: 2205,
    exGroup: "Грудь",
    exerciseName: "Жим гантелей лежа"
  },
  {
    exId: 2006,
    exGroup: "Грудь",
    exerciseName: "Отжимания от пола"
  },
  {
    exId: 3207,
    exGroup: "Дельты",
    exerciseName: "Поднятие 2-х гентелей в стороны стоя"
  },
  {
    exId: 3208,
    exGroup: "Дельты",
    exerciseName: "Поднятие 2-х гентелей в стороны в наклоне"
  },
  {
    exId: 3214,
    exGroup: "Дельты",
    exerciseName: "Жим гантелей вверх сидя"
  },
  {
    exId: 4109,
    exGroup: "Руки",
    exerciseName: "Подъем гантели в наклоне(бицепс)"
  },
  {
    exId: 4210,
    exGroup: "Руки",
    exerciseName: "Подъем 2-х гантелей стоя(бицепс)"
  },
  {
    exId: 4111,
    exGroup: "Руки",
    exerciseName: "Подъем гантели сидя(бицепс)"
  },
  {
    exId: 4212,
    exGroup: "Руки",
    exerciseName: "Молотки"
  },
  {
    exId: 4113,
    exGroup: "Руки",
    exerciseName: "Разгибание гантели в наклоне(трицепс)"
  },

  {
    exId: 5115,
    exGroup: "Ноги",
    exerciseName: "Выпады"
  },
  {
    exId: 5216,
    exGroup: "Ноги",
    exerciseName: "Приседания с гантелями"
  },
  {
    exId: 5117,
    exGroup: "Ноги",
    exerciseName: "Икры"
  },
  {
    exId: 6018,
    exGroup: "Пресс",
    exerciseName: "Пресс с гантелей"
  },
  {
    exId: 6019,
    exGroup: "Пресс",
    exerciseName: "Подъем ног лежа"
  }
];
