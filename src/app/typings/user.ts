/**
 * Полное имя пользователя, разбитое на составные части.
 */
export type UserFullName = {
  /** Имя пользователя */
  firstname: string;

  /** Отчество пользователя */
  middlename: string;

  /** Фамилия пользователя */
  lastname: string;
};
