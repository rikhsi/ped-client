import {
  DestroyRef,
  Directive,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FunctionType } from '@typings';

/**
 * Абстрактная директива-база для кастомных контролов.
 *
 * Реализует интерфейс `ControlValueAccessor`, чтобы Angular Forms
 * мог работать с произвольными элементами (не только input/select).
 *
 * Содержит:
 * - модель значения (`value`);
 * - модель для disabled-состояния (`disabled`);
 * - реактивные флаги (`isRequired`, `message`);
 * - `validate$` для кастомной валидации;
 * - методы из `ControlValueAccessor` (`writeValue`, `registerOnChange` и т.д.).
 *
 * Наследники (например, `FileInputDirective`, `TextInputComponent`)
 * расширяют эту директиву и добавляют собственное поведение.
 */
@Directive()
export abstract class ControlBaseDirective<T> implements ControlValueAccessor {
  /** Значение контрола (связано с Angular Forms) */
  value = model<T>();

  /** Флаг блокировки (алиас `blocked` для удобства использования в шаблоне) */
  disabled = model<boolean>(false, { alias: 'blocked' });

  /** Текст сообщения об ошибке (или подсказки) */
  message = signal<string>(null);

  /** Обязательность поля */
  isRequired = input<boolean>(false);

  /** Для отписок/чистки ресурсов */
  protected destroyRef = inject(DestroyRef);

  /** Колбэки, которые Angular Forms передаёт контролу */
  public onChange: FunctionType<T> = () => {};
  public onTouched: FunctionType<T> = () => {};

  // ---- ControlValueAccessor ----

  /** Устанавливается значение из FormControl */
  writeValue(value: T): void {
    this.value.set(value);
  }

  /** Angular Forms сообщает, что надо реагировать на изменения */
  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  /** Angular Forms сообщает, что надо реагировать на "touched" */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Angular Forms сообщает, что контрол должен быть disabled */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  // ---- Helpers ----

  /** Вызывается при изменении значения внутри кастомного контрола */
  modelChange(value: T): void {
    this.value.set(value);
    this.onChange?.(value); // синхронизация с Angular Forms
  }

  /** Отмечаем контрол как "затронутый" (touched) */
  markAsTouched(): void {
    this.onTouched?.();
  }
}
