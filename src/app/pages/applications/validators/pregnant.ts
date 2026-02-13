import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const pregnantValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  return control.value === 'no' ? null : { requiredNo: true };
};
