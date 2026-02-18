import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { MAP_REMOVE_CONTROLS, MAP_BEHAVIORS } from '@layouts/data';
import { mapBehaviorDisable, mapControlRemove } from '@shared/utils';
import {
  YaMapComponent,
  YaPlacemarkDirective,
  YaReadyEvent,
} from 'angular8-yandex-maps';

@Component({
  selector: 'ped-place-map',
  imports: [YaMapComponent, YaPlacemarkDirective],
  templateUrl: './place-map.component.html',
  styleUrl: './place-map.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceMapComponent {
  coords = input<[number, number]>([41.302222, 69.279081]);
  zoom = input<number>(17);
  isReady = signal<boolean>(false);
  map = signal<ymaps.Map | null>(null);

  onMapInit({ target }: YaReadyEvent<ymaps.Map>): void {
    mapControlRemove(target, MAP_REMOVE_CONTROLS);
    mapBehaviorDisable(target, MAP_BEHAVIORS);

    this.map.set(target);
    this.isReady.set(true);
  }
}
