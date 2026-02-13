import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'ped-stepper',
  imports: [],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperComponent {
  currentStepIndex = input<number>(0);
  stepsLength = input<number>(1);

  list = computed(() =>
    Array.from({ length: this.stepsLength() }, (_, index) => index),
  );
}
