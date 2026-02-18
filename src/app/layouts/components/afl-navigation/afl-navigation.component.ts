import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationStep } from '@layouts/models';
import { StepperComponent } from '@shared/components';

@Component({
  selector: 'ped-afl-navigation',
  imports: [StepperComponent, TranslocoDirective],
  templateUrl: './afl-navigation.component.html',
  styleUrl: './afl-navigation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AflNavigationComponent {
  name = input<string>();
  seasonName = input<string>();
  steps = input<ApplicationStep[]>();
  currentStepIndex = input<number>();
}
