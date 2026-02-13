import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  input,
} from '@angular/core';
import { ExternalService } from '@api/models';

@Directive({
  selector: '[pedExternal]',
})
export class ExternalDirective {
  externalId = input<ExternalService>(null, { alias: 'pedExternal' });

  enableServices = [ExternalService.PEDAGOG];

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
  ) {
    effect(() => {
      const externalId = this.externalId();

      this.vcr.clear();

      if (externalId == null) return;

      const found = this.enableServices.includes(externalId);

      if (!found) return;

      this.vcr.createEmbeddedView(this.tpl);
    });
  }
}
