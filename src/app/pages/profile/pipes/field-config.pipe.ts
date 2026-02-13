import { Pipe, PipeTransform } from '@angular/core';

type FieldType = 'phone' | 'email';

interface FieldConfig {
  mask: string;
  placeholder: string;
}

@Pipe({
  name: 'fieldConfig',
})
export class FieldConfigPipe implements PipeTransform {
  private configs: Record<FieldType, FieldConfig> = {
    phone: {
      mask: '+000 (00) 000-00-00',
      placeholder: '+998 (90) 123-45-67',
    },
    email: {
      mask: '',
      placeholder: 'example@mail.com',
    },
  };

  transform(fieldType: FieldType, property: keyof FieldConfig): string {
    return this.configs[fieldType]?.[property] || '';
  }
}
