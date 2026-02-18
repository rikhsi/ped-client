import { FormControl } from '@angular/forms';

export type InstitutionForm = {
  regionId: FormControl<number>;
  districtId: FormControl<number>;
  eduDirection: FormControl<number>;
  institutionId: FormControl<number>;
};
