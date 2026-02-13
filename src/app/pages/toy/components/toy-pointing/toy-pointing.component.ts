import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { StepperComponent } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'ped-toy-pointing',
  imports: [
    NzButtonComponent,
    NzIconDirective,
    StepperComponent,
    TranslocoDirective,
  ],
  templateUrl: './toy-pointing.component.html',
  styleUrl: './toy-pointing.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToyPointingComponent {
  constructor(
    private nmRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) private data: any,
  ) {}

  close(): void {
    this.nmRef.close();
  }

  next(): void {}

  back(): void {}
}
