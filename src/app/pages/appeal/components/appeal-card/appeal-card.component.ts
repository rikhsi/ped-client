import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { AppealShortItem } from '@api/models';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatePipe } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { AppealStatusColorPipe, AppealStatusPipe } from '@shared/pipes';
import { ChipComponent } from '@shared/components';

@Component({
  selector: 'ped-appeal-card',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    DatePipe,
    TranslocoDirective,
    RouterLink,
    ChipComponent,
    AppealStatusColorPipe,
    AppealStatusPipe,
  ],
  template: `
    <ng-container *transloco="let t">
      <div class="appeal-card">
        <div class="appeal-header">
          <div class="appeal-label">{{ t('prop.appeal_id') }}</div>
          <div class="appeal-number">{{ appeal().id }}</div>
        </div>

        <div class="appeal-date">
          <div class="date-label">{{ t('prop.submitted_date') }}</div>
          <div class="date-value">
            {{ appeal().createdAt | date: 'dd.MM.yyyy hh:mm' }}
          </div>
        </div>

        <div class="appeal-status">
          <div class="status-label">{{ t('prop.status') }}</div>
          <ped-chip [color]="appeal()?.status | appealStatusColor">{{
            appeal()?.status | appealStatus
          }}</ped-chip>
        </div>

        <div class="appeal-actions">
          <button
            nz-button
            class="view-btn"
            [routerLink]="['/main/appeal/self', appeal().id]"
          >
            <span nz-icon nzType="eye"></span>
            {{ t('action.view_details') }}
          </button>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./appeal-card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppealCardComponent {
  appeal = input.required<AppealShortItem>();
}
