import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  input,
} from '@angular/core';
import { ApplicationStatus } from '@api/models';

@Directive({
  selector: '[pedEditBtnEnable]',
})
export class EditBtnEnableDirective {
  currentStatus = input<number>(null, { alias: 'pedEditBtnEnable' });
  enableStatuses = [
    ApplicationStatus.NEW,
    ApplicationStatus.CREATED,
    ApplicationStatus.WAITING_PAYMENT,
    ApplicationStatus.REJECTED_MODIFY,
  ];

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
  ) {
    effect(() => {
      const status = this.currentStatus();

      this.vcr.clear();
      if (status == null) return;

      const found = this.enableStatuses.includes(this.currentStatus());

      if (!found) return;

      this.vcr.createEmbeddedView(this.tpl);
    });
  }
}
