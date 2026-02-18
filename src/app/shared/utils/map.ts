import { MapBehavior, MapControl } from '@typings';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Удаляет указанные контролы с карты.
 *
 * @param target - объект ymaps.Map
 * @param controls - массив контролов для удаления (например: 'zoomControl', 'typeSelector')
 */
export function mapControlRemove(target: ymaps.Map, controls: MapControl[]) {
  controls.forEach((control) => {
    target.controls.remove(control);
  });
}

/**
 * Добавляет указанные контролы на карту.
 *
 * @param target - объект ymaps.Map
 * @param controls - массив контролов для добавления (например: 'zoomControl', 'typeSelector')
 */
export function mapControlAdd(target: ymaps.Map, controls: MapControl[]) {
  controls.forEach((control) => {
    // Нужно приводить к NzSafeAny, т.к. типы ymaps могут не полностью совпадать
    target.controls.add(control as NzSafeAny);
  });
}

/**
 * Отключает указанные поведения карты (например: drag, scrollZoom).
 *
 * @param target - объект ymaps.Map
 * @param behaviors - массив поведений для отключения
 */
export function mapBehaviorDisable(
  target: ymaps.Map,
  behaviors: MapBehavior[],
): void {
  behaviors.forEach((behavior) => {
    target.behaviors.disable(behavior);
  });
}

/**
 * Включает указанные поведения карты (например: drag, scrollZoom).
 *
 * @param target - объект ymaps.Map
 * @param behaviors - массив поведений для включения
 */
export function mapBehaviorEnable(
  target: ymaps.Map,
  behaviors: MapBehavior[],
): void {
  behaviors.forEach((behavior) => {
    target.behaviors.enable(behavior);
  });
}
