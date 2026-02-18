import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemComponent } from '@shared/components';
import {
  ClockCircleOutline,
  InfoCircleOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconDirective, provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ped-place-item',
  imports: [ItemComponent, NzButtonComponent, NzIconDirective, RouterLink],
  templateUrl: './place-item.component.html',
  styleUrl: './place-item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNzIconsPatch([ClockCircleOutline, InfoCircleOutline])],
})
export class PlaceItemComponent {}
