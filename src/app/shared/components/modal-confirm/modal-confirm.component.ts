import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  model,
  OnInit,
} from '@angular/core';
import { ConfirmModal } from '@typings';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'ped-modal-confirm',
  imports: [NzButtonModule],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalConfirmComponent implements OnInit {
  config = model<ConfirmModal>();

  constructor(
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) private modalData: ConfirmModal,
  ) {}

  ngOnInit(): void {
    this.config.update(() => this.modalData);
  }

  cancel(): void {
    this.modalRef.close(false);
  }

  submit(): void {
    this.modalRef.close(true);
  }
}
