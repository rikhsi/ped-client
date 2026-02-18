import { Component, input } from '@angular/core';
import { AppealShortItem } from '@api/models';
import { ChipComponent } from '@shared/components';
import { AppealStatusColorPipe, AppealStatusPipe } from '@shared/pipes';

@Component({
  selector: 'ped-appeal-status',
  standalone: true,
  template: `
    <ped-chip [color]="row()?.status | appealStatusColor">{{
      row()?.status | appealStatus
    }}</ped-chip>
  `,
  imports: [ChipComponent, AppealStatusPipe, AppealStatusColorPipe],
})
export class AppealStatusComponent {
  row = input.required<AppealShortItem>();
}
