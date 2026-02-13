import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flagPath',
})
export class FlagPathPipe implements PipeTransform {
  transform(language: string): string {
    if (!language) return '';

    return `icons/colorful/${language.toLowerCase()}-flag.svg`;
  }
}
