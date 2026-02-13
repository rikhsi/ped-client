import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const certificateRequiredWhenUseValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const form = control as any;

  const use = form.get('use')?.value;
  const certificateId = form.get('certificateId')?.value;

  // если use = false → валидатор не вмешивается
  if (!use) {
    return null;
  }

  // use = true, но certificateId не указан
  if (!certificateId) {
    return {
      certificateRequired: true,
    };
  }

  return null;
};
