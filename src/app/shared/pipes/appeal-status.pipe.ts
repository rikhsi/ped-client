import { inject, Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from '@app/api/models';
import { ENUM_ITEMS_TOKEN } from '@constants';
import { EnumItemsResult } from '@typings';

@Pipe({
  name: 'appealStatus',
})
export class AppealStatusPipe implements PipeTransform {
  enumItems: EnumItemsResult = inject(ENUM_ITEMS_TOKEN);

  transform(value: number): string {
    return this.enumItems.appealStatus?.find(
      (item: SelectItem<number>) => item.value === value,
    )?.key;
  }
}
