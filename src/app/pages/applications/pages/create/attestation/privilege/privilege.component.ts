import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoDirective } from '@jsverse/transloco';
import { ApplicationFormLayoutService } from '@layouts/services';
import { ApplicationDropFileComponent } from '@pages/applications/components';
import {
  PrivilegeAgePipe,
  PrivilegeExperiencePipe,
} from '@pages/applications/pipes';
import { AttestationPrivilageService } from '@pages/applications/services/attestation';
import { ItemComponent, SelectDefaultComponent } from '@shared/components';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'ped-privilege',
  imports: [
    ApplicationDropFileComponent,
    TranslocoDirective,
    ReactiveFormsModule,
    SelectDefaultComponent,
    NzOptionComponent,
    ItemComponent,
    NzAlertComponent,
    PrivilegeAgePipe,
    PrivilegeExperiencePipe,
  ],
  templateUrl: './privilege.component.html',
  styleUrl: './privilege.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AttestationPrivilageService],
})
export class PrivilegeComponent implements OnInit {
  readonly privileges = computed(() => this.apService.privileges());
  readonly isPrivilegesLoading = computed(() =>
    this.apService.isPrivilegesLoading(),
  );
  readonly selectedPrivelege = computed(() =>
    this.apService.selectedPrivilege(),
  );

  get form() {
    return this.apService.form;
  }

  constructor(
    private apService: AttestationPrivilageService,
    private destroyRef: DestroyRef,
    private aclService: ApplicationFormLayoutService,
  ) {}

  ngOnInit(): void {
    this.apService
      .getPrivileges$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.apService
            .updateSelectedPrivilege$()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

          this.apService.initForm(this.aclService.attestationHelperForm);
        },
      });

    this.aclService
      .controlDisabledState$(this.form, 'next')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aclService.next$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const { file, fileType } = this.form.getRawValue();

        const selectedPrivilege = this.privileges().find(
          (item) => item.id === fileType,
        );

        this.aclService.attestationHelperForm.patchValue({
          privelegeFileType: fileType,
          privilegeFile: file,
        });

        this.aclService.applicationForm.patchValue({
          privilegeId: fileType,
        });

        this.aclService.privilege.set(selectedPrivilege);
      });
  }
}
