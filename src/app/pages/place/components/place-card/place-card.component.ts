import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectItem } from '@api/models';
import { ItemComponent, ChipComponent } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-place-card',
  imports: [
    ItemComponent,
    NzButtonComponent,
    NzIconDirective,
    RouterLink,
    NgClass,
    ChipComponent,
  ],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceCardComponent {
  title = input<string>();
  subTitle = input<string>();
  options = input<SelectItem<string>[]>([]);
  footerText = input<string>();
  link = input<string>();
  buttonText = input<string>('Перейти');
  status = input<string>();

  limitedOptions = computed<SelectItem<string>[]>(() =>
    this.options().filter((v, i) => i < 2),
  );

  clicked = output<void>();
}
