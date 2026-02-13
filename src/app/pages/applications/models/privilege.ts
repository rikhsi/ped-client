import { FormControl } from '@angular/forms';
import { NationalCertificate, StcCertificate } from '@api/models';

export type PrivilegeForm = {
  fileType: FormControl<number>;
  file: FormControl<File>;
};

export interface CustomNationalCertificate extends NationalCertificate {
  customId: string;
}

export interface CustomStcCertificate extends StcCertificate {
  customId: string;
}
