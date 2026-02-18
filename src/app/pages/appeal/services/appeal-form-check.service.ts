import { computed, Injectable } from '@angular/core';
import { AppealsApiService } from '@api/controllers';
import { BaseResult } from '@api/models';
import { AuthService } from '@core/services';
import { AppealFormLayoutService } from '@layouts/services';
import { Observable } from 'rxjs';

@Injectable()
export class AppealFormCheckService {
  readonly user = computed(() => this.authService.user());

  get appealForm() {
    return this.aflService.appealForm;
  }

  constructor(
    private authService: AuthService,
    private appealApi: AppealsApiService,
    private aflService: AppealFormLayoutService,
  ) {}

  public create$(): Observable<BaseResult<boolean>> {
    const { comment, complaintVariantId, applicationId } =
      this.appealForm.getRawValue();

    return this.appealApi.createAppeal$({
      comment,
      complaintVariantId,
      applicationId,
    });
  }

  public edit$(): Observable<BaseResult<boolean>> {
    const { comment, complaintVariantId, applicationId } =
      this.appealForm.getRawValue();

    const appealId = this.aflService.appeal()?.id;

    return this.appealApi.editAppeal$(appealId, {
      comment,
      complaintVariantId,
    });
  }
}
