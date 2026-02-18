import { Injectable, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DiplomasApiService } from '@api/controllers';
import { DiplomaItem } from '@api/models';
import { ApplicationFormLayoutService } from '@layouts/services';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class AttestationDiplomaService {
  readonly diplomas = signal<DiplomaItem[]>([]);

  readonly control = new FormControl(null, [Validators.required]);
  readonly diplomaFile = new FormControl(null, [Validators.required]);

  constructor(
    private diplomaApi: DiplomasApiService,
    private aclService: ApplicationFormLayoutService,
  ) {}

  public listenControl$(): Observable<number> {
    return this.control.valueChanges.pipe(
      tap(() => {
        this.diplomaFile.reset();
      }),
    );
  }

  public loadDiplomas$(): Observable<DiplomaItem[]> {
    return this.diplomaApi.getDiplomas$().pipe(
      map(({ result }) => result),
      tap((result) => {
        this.diplomas.set(result);
      }),
    );
  }

  public initForm(formDiplomaId: number): void {
    if (formDiplomaId) {
      const { diplomaFile } =
        this.aclService.attestationHelperForm.getRawValue();

      this.control.setValue(formDiplomaId);
      this.diplomaFile.setValue(diplomaFile);
    }
  }

  public initResetter$(): Observable<Object> {
    return this.control.valueChanges.pipe(
      tap(() => {
        this.aclService.applicationForm.patchValue({
          subjectId: null,
          institutionId: null,
          language: null,
          category: null,
          attestationData: {
            attestationType: null,
            dtmCertificateId: null,
            nationalCertificateId: null,
            usePrivilege: null,
          },
          privilegeId: null,
          attachedFiles: [],
          externalId: null,
        });

        this.aclService.attestationHelperForm.patchValue({
          privelegeFileType: null,
          privilegeFile: null,
          regionId: null,
          districtId: null,
          eduDirection: null,
          diplomaFile: null,
        });

        this.aclService.certificate.set(null);
        this.aclService.dtmCertificate.set(null);
        this.aclService.privilege.set(null);
        this.aclService.nationalCertificate.set(null);
        this.aclService.subject.set(null);
        this.aclService.institution.set(null);
      }),
    );
  }
}
