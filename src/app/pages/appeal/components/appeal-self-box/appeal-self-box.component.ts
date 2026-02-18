import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ped-appeal-self-box',
  templateUrl: './appeal-self-box.component.html',
  styleUrl: './appeal-self-box.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppealSelfBoxComponent {
  title = input<string>();
}
