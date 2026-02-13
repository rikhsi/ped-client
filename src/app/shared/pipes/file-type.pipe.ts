import { Pipe, PipeTransform } from '@angular/core';
import { FileType } from '@typings';

@Pipe({
  name: 'fileType',
})
export class FileTypePipe implements PipeTransform {
  transform(value: string | File | null | undefined): FileType {
    if (!value) {
      return 'file';
    }

    const name =
      value instanceof File ? value.name : this.getNameFromUrl(value);

    const ext = name.split('.').pop()?.toLowerCase() ?? '';

    if (['doc', 'docx'].includes(ext)) return 'word';
    if (['xls', 'xlsx'].includes(ext)) return 'excel';
    if (ext === 'pdf') return 'pdf';
    if (ext === 'zip') return 'zip';
    if (ext === 'rar') return 'rar';

    return 'file';
  }

  private getNameFromUrl(url: string): string {
    return url.split('?')[0].split('/').pop() ?? '';
  }
}
