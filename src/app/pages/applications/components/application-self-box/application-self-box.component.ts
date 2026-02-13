import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ped-application-self-box',
  templateUrl: './application-self-box.component.html',
  styleUrl: './application-self-box.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationSelfBoxComponent {
  title = input<string>();
}
