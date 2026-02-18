import { inject, Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { ModalVerificationComponent } from '../components/modal-verification/modal-verification.component';
import { VerificationModalData, VerificationModalResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ModalVerificationService {
  private modal = inject(NzModalService);

  openVerificationModal(
    data: VerificationModalData,
  ): Observable<VerificationModalResult | null> {
    const modalRef = this.modal.create({
      nzContent: ModalVerificationComponent,
      nzData: data,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
      nzWidth: 480,
      nzCentered: true,
    });

    return modalRef.afterClose;
  }
}
