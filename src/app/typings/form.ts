import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

/**
 * Извлекает тип значения из FormControl.
 *
 * Пример:
 *  const control = new FormControl<number>(0);
 *  type Value = ControlValue<typeof control>; // number
 */
export type ControlValue<T> = T extends FormControl<infer V> ? V : never;

/**
 * Создает тип объекта с "чистыми" значениями формы из формы Angular.
 *
 * Пример:
 *  const form = new FormGroup({
 *    name: new FormControl<string>(''),
 *    age: new FormControl<number>(0),
 *  });
 *  type Values = FormValues<typeof form.controls>;
 *  // Values = { name: string; age: number }
 */
export type FormValues<T> = {
  [K in keyof T]: ControlValue<T[K]>;
};

/**
 * Универсальный тип для всех форм-контролов Angular:
 * FormControl, FormGroup и FormArray.
 */
export type ControlType = AbstractControl | FormGroup | FormArray;
