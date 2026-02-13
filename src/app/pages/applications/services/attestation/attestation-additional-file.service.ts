import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApplicationFormLayoutService } from '@layouts/services';

@Injectable()
export class AttestationAdditionalFileService {
  readonly control = new FormControl(null);

  constructor(private aclService: ApplicationFormLayoutService) {}

  public initForm(): void {
    const { additionalFile } =
      this.aclService.attestationHelperForm.getRawValue();

    this.control.setValue(additionalFile);
  }
}
