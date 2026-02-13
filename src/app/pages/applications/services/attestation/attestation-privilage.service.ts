import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrivilegeApiService } from '@api/controllers';
import { PrivilegeItem } from '@api/models';
import { AttestationHelperForm } from '@layouts/models';
import { PrivilegeForm } from '@pages/applications/models';
import { map, Observable, startWith, tap } from 'rxjs';

@Injectable()
export class AttestationPrivilageService {
  readonly privileges = signal<PrivilegeItem[]>([]);
  readonly isPrivilegesLoading = signal<boolean>(true);
  readonly selectedPrivilege = signal<PrivilegeItem>(null);

  readonly form = new FormGroup<PrivilegeForm>({
    fileType: new FormControl(null, Validators.required),
    file: new FormControl(null),
  });

  constructor(private privilegeApi: PrivilegeApiService) {}

  public initForm(helperForm: FormGroup<AttestationHelperForm>): void {
    this.form.disable({ emitEvent: false });

    const { privelegeFileType, privilegeFile } = helperForm.getRawValue();

    let fileTypeToPatch = privelegeFileType ?? null;
    let fileToPatch = privilegeFile ?? null;

    if (fileTypeToPatch !== null) {
      this.form.patchValue(
        {
          fileType: fileTypeToPatch,
          file: fileToPatch,
        },
        { emitEvent: false },
      );
    }

    // 🔹 ВАЖНО: вручную применяем логику из updateSelectedPrivilege$
    const selectedItem =
      this.privileges().find(
        (item) => item.id === this.form.getRawValue().fileType,
      ) ?? null;

    this.selectedPrivilege.set(selectedItem);

    const fileControl = this.form.controls.file;

    if (selectedItem?.isFileRequired) {
      fileControl.addValidators(Validators.required);
    } else if (selectedItem) {
      fileControl.removeValidators(Validators.required);
    }

    fileControl.updateValueAndValidity({ emitEvent: false }); // пересчитываем валидаторы

    this.form.enable();
  }

  public getPrivileges$(): Observable<PrivilegeItem[]> {
    return this.privilegeApi
      .getAllPrivileges$({
        pageSize: 100,
        pageIndex: 0,
        sort: [],
        filter: [],
      })
      .pipe(
        map(({ result }) => result.items),
        tap((items) => {
          this.privileges.set(items);
          this.isPrivilegesLoading.set(false);
        }),
      );
  }

  public updateSelectedPrivilege$(): Observable<number> {
    return this.form.controls.fileType.valueChanges.pipe(
      startWith(this.form.getRawValue().fileType),
      tap((value) => {
        const selectedItem = this.privileges().find(
          (item) => item.id === value,
        );

        this.selectedPrivilege.set(selectedItem);

        const fileControl = this.form.controls.file;

        if (selectedItem?.isFileRequired) {
          fileControl.addValidators(Validators.required);
        } else {
          fileControl.removeValidators(Validators.required);
        }

        // 🔴 ВАЖНО: пересчитать именно этот контрол
        fileControl.updateValueAndValidity({ emitEvent: true });
      }),
    );
  }
}
