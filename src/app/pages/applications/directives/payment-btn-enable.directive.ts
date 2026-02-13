import {
  Directive,
  effect,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ApplicationStatus } from '@api/models';

@Directive({
  selector: '[pedPaymentBtnEnable]',
})
export class PaymentBtnEnableDirective {
  currentStatus = input<number>(null, { alias: 'pedPaymentBtnEnable' });
  enableStatuses = [ApplicationStatus.WAITING_PAYMENT];

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
