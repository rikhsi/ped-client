import { Pipe, PipeTransform } from '@angular/core';
import { CertificateStatus } from '@app/api/models';
import { CERT_STATUS_COLOR } from '@constants';

@Pipe({
  name: 'certStatusColor',
})
export class CertStatusColorPipe implements PipeTransform {
  transform(value: number): string {
    return CERT_STATUS_COLOR[value as CertificateStatus];
  }
}
