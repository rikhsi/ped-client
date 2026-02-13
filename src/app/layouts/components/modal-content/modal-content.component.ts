import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  model,
  OnInit,
} from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export interface ContentModal {
  title: string;
  content: string;
}

@Component({
  selector: 'ped-modal-content',
  imports: [NzButtonModule],
  templateUrl: './modal-content.component.html',
  styleUrl: './modal-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContentComponent implements OnInit {
  config = model<ContentModal>();

  constructor(
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) private modalData: ContentModal,
  ) {}

  ngOnInit(): void {
    this.config.update(() => this.modalData);
  }

  close(): void {
    this.modalRef.close();
  }
}
