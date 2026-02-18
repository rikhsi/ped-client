import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { DiplomaCardComponent } from './components';
import { SListService } from '@shared/services';
import { BoxInfinite } from '@shared/components';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { DiplomasService } from './services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EnumItemPipe } from '@shared/pipes';

@Component({
  selector: 'ped-diplomas',
  imports: [
    DiplomaCardComponent,
    TranslocoDirective,
    NzButtonComponent,
    NzIconDirective,
    BoxInfinite,
    EnumItemPipe,
  ],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService, DiplomasService],
})
export class DiplomasComponent {
  readonly isLoading = computed(() => this.diplomasService.isLoading());
  readonly items = computed(() => this.diplomasService.items());

  constructor(
    private diplomasService: DiplomasService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.diplomasService
      .initDiplomas$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.diplomasService
      .initRefresh$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.diplomasService.load$.next();
  }

  onRefresh(): void {
    this.diplomasService.refresh$.next();
  }
}
