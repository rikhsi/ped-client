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
import { translate } from '@jsverse/transloco';
import { ChipComponent, ItemComponent } from '@shared/components';
import {
  ApplicationStatusColorPipe,
  ApplicationStatusPipe,
  EnumItemPipe,
} from '@shared/pipes';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-application-card',
  imports: [
    ItemComponent,
    NzButtonComponent,
    NzIconDirective,
    RouterLink,
    NgClass,
    ChipComponent,
    ApplicationStatusPipe,
    ApplicationStatusColorPipe,
    EnumItemPipe,
  ],
  templateUrl: './application-card.component.html',
  styleUrl: './application-card.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationCardComponent {
  title = input<string>();
  subTitle = input<string>();
  options = input<SelectItem<string>[]>([]);
  footerText = input<string>();
  link = input<string>();
  buttonText = input<string>(translate('action.go'));
  status = input<number>();
  applicationType = input<number>();

  limitedOptions = computed<SelectItem<string>[]>(() =>
    this.options().filter((v, i) => i < 2),
  );

  clicked = output<void>();
}
