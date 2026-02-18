import { Component, input } from '@angular/core';
import { AppealShortItem } from '@api/models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ped-appeal-number-cell',
  standalone: true,
  template: `{{ row().id }}`,
})
export class AppealNumberCellComponent {
  row = input.required<AppealShortItem>();
}

@Component({
  selector: 'ped-date-cell',
  standalone: true,
  imports: [DatePipe],
  template: `{{ row().createdAt | date: 'dd.MM.yyyy hh:mm' }}`,
})
export class DateCellComponent {
  row = input.required<AppealShortItem>();
}
