import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * Анимация для сворачивания/разворачивания блока.
 *
 * Используется вместе с *ngIf или [@collapse] в шаблоне.
 *
 * Состояния:
 * - 'true'  — элемент развернут (видимый)
 * - 'false' — элемент свернут (скрыт)
 *
 * Переходы:
 * - false => true: плавное разворачивание (ease-in)
 * - true => false: плавное сворачивание (ease-out)
 */
export const COLLAPSE = trigger('collapse', [
  state(
    'true',
    style({
      height: AUTO_STYLE, // высота определяется автоматически по контенту
      opacity: 1,         // полностью видимый
      overflow: 'hidden', // скрываем переполнение при анимации
    }),
  ),
  state(
    'false',
    style({
      height: '0px',      // свернутый блок
      opacity: 0,         // полностью прозрачный
      overflow: 'hidden', // переполнение скрыто
    }),
  ),
  // Плавное раскрытие блока
  transition('false => true', animate('200ms ease-in')),

  // Плавное сворачивание блока
  transition('true => false', animate('200ms ease-out')),
]);
