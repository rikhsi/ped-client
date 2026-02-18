import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'ped-place-box',
  imports: [RouterOutlet],
  templateUrl: './place-box.component.html',
  styleUrl: './place-box.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceBoxComponent {}
