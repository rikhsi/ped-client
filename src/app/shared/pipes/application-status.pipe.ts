import { inject, Pipe, PipeTransform } from '@angular/core';
import { ApplicationType, SelectItem } from '@app/api/models';
import { ENUM_ITEMS_TOKEN } from '@constants';
import { EnumItemsResult } from '@typings';

@Pipe({
  name: 'applicationStatus',
})
export class ApplicationStatusPipe implements PipeTransform {
  enumItems: EnumItemsResult = inject(ENUM_ITEMS_TOKEN);

  transform(value: number, type: ApplicationType): string {
    switch (type) {
      default: {
        return this.enumItems.applicationStatus?.find(
          (item: SelectItem<number>) => item.value === value,
        )?.key;
      }
    }
  }
}
