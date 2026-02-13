import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AppealFormLayoutService } from '../../services';
import {
  AflContentComponent,
  AflNavigationComponent,
} from '@layouts/components';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'ped-appeal-form-layout',
  imports: [AflContentComponent, AflNavigationComponent, TranslocoDirective],
  templateUrl: './appeal-form-layout.component.html',
  styleUrl: './appeal-form-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppealFormLayoutComponent implements OnInit, OnDestroy {
  readonly currentStepIndex = computed(() =>
    this.aflService.currentStepIndex(),
  );

  readonly steps = computed(() => this.aflService.steps());

  readonly buttons = computed(() => this.aflService.buttons());

  readonly routeListenerReady = signal<boolean>(false);

  constructor(
    public aflService: AppealFormLayoutService,
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.aflService
      .initRouteButtonsListener$(this.route)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.routeListenerReady.set(true);
      });

    this.aflService
      .initNext$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.aflService
      .initBack$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.aflService
      .initCancel$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.aflService
      .initSend$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aflService.initCurrentIndex();

    this.router.navigate([], { onSameUrlNavigation: 'reload' });
  }

  ngOnDestroy(): void {
    this.aflService.clearState();
  }

  public onCancel(): void {
    this.aflService.cancel$.next();
  }

  public onBack(): void {
    this.aflService.back$.next();
  }

  public onNext(): void {
    this.aflService.next$.next();
  }

  public onSend(): void {
    this.aflService.send$.next();
  }
}
