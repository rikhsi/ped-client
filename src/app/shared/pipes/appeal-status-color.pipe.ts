import { Pipe, PipeTransform } from '@angular/core';
import { AppealStatus } from '@app/api/models';
import { APPEAL_STATUS_COLOR } from '@constants';

@Pipe({
  name: 'appealStatusColor',
})
export class AppealStatusColorPipe implements PipeTransform {
  transform(value: number): string {
    return APPEAL_STATUS_COLOR[value as AppealStatus];
  }
}
