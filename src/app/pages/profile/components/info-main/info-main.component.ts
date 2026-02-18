import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  DaysToRemainingDaysPipe,
  DaysToRemainingMonthsPipe,
  DaysToYearsPipe,
  GenderPipe,
  PassportNumberPipe,
  PluralizePipe,
} from '@shared/pipes';
import { DatePipe } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { PassportItem } from '@api/models';

@Component({
  selector: 'ped-info-main',
  imports: [
    GenderPipe,
    DatePipe,
    PassportNumberPipe,
    TranslocoDirective,
    DaysToYearsPipe,
    DaysToRemainingMonthsPipe,
    DaysToRemainingDaysPipe,
    PluralizePipe,
  ],
  templateUrl: './info-main.component.html',
  styleUrl: './info-main.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoMainComponent {
  workExperience = input<number>(0);
  pedagogueExperience = input<number>(0);
  pinfl = input<string>();
  passport = input<PassportItem>();
  birthDate = input<string>();
  gender = input<boolean>();
}
