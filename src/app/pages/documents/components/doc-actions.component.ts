import { Component, Inject, input } from '@angular/core';
import { TABLE_CLICK } from '@constants';
import { TableClickFunc } from '@typings';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'ped-doc-actions',
  standalone: true,
  imports: [NzIconModule],
  template: `
    <button class="action-btn" (click)="onClick()">
      <span nz-icon nzType="eye"></span>
    </button>
  `,
  styles: [
    `
      .action-btn {
        border: none;
        background: #f5f7fa;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #7d8495;
        transition: all 0.2s;
      }
      .action-btn:hover {
        background: #e6e8ec;
        color: #555;
      }

      [nz-icon] {
        font-size: 18px;
      }
    `,
  ],
})
export class DocActionsComponent<T> {
  row = input.required<T>();

  constructor(@Inject(TABLE_CLICK) private click: TableClickFunc) {}

  onClick(): void {
    this.click('open');
  }
}
