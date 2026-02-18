import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PlaceBoxComponent, PlaceMapComponent } from '@layouts/components';

@Component({
  selector: 'ped-place-layout',
  imports: [PlaceBoxComponent, PlaceMapComponent],
  templateUrl: './place-layout.component.html',
  styleUrl: './place-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceLayoutComponent {}
