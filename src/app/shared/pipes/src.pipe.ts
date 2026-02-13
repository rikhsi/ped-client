import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'src',
})
export class SrcPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return environment.fileUrl + value;
    }

    return null;
  }
}
