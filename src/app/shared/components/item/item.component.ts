import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ped-item',
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './item.component.html',
  styleUrl: './item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  label = input<string>();
  value = input<string | number>();
  type = input<'primary' | 'default'>();
  danger = input<boolean>();
  template = input<TemplateRef<any>>();
}
