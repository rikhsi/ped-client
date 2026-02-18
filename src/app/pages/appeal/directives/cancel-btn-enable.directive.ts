import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  input,
} from '@angular/core';
import { AppealStatus } from '@api/models';

@Directive({
  selector: '[pedCancelBtnEnable]',
})
export class CancelBtnEnableDirective {
  currentStatus = input<number>(null, { alias: 'pedCancelBtnEnable' });
  enableStatuses = [AppealStatus.NEW, AppealStatus.CHECKING];

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
