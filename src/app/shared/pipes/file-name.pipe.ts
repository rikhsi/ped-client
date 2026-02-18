import { Pipe, PipeTransform } from '@angular/core';
import { translate } from '@jsverse/transloco';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(value: string | File | null | undefined): string {
    if (!value) {
      return translate('file.unknown');
    }

    const name = value instanceof File ? value.name : value;

    return name;
  }
}
