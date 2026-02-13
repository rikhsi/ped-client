import { Pipe, PipeTransform } from '@angular/core';
import { ApplicationStatus, ApplicationType } from '@app/api/models';
import { APPLICATION_STATUS_COLOR } from '@constants';

@Pipe({
  name: 'applicationStatusColor',
})
export class ApplicationStatusColorPipe implements PipeTransform {
  transform(value: number, type: ApplicationType): string {
    switch (type) {
      default: {
        return APPLICATION_STATUS_COLOR[
          value as ApplicationStatus
        ];
      }
    }
  }
}
