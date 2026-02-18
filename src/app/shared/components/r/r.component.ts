import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

interface Heart {
  x: number;
  delay: number;
  size: number;
}

@Component({
  selector: 'ped-r',
  imports: [],
  templateUrl: './r.component.html',
  styleUrl: './r.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RComponent {
  constructor(private nmRef: NzModalRef) {}

  close(): void {
    this.nmRef.close(true);
  }

  hearts: Heart[] = Array.from({ length: 30 }, () => ({
    x: Math.random(),
    delay: Math.random(),
    size: 16 + Math.random() * 12,
  }));
}
