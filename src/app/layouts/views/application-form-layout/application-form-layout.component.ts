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
import {
  AflContentComponent,
  AflNavigationComponent,
} from '@layouts/components';
import { ApplicationFormLayoutService } from '@layouts/services';
import { EnumItemPipe } from '@shared/pipes';

@Component({
  selector: 'ped-application-form-layout',
  imports: [AflContentComponent, AflNavigationComponent, EnumItemPipe],
  templateUrl: './application-form-layout.component.html',
  styleUrl: './application-form-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationFormLayoutComponent implements OnInit, OnDestroy {
  readonly currentStepIndex = computed(() =>
    this.aclService.currentStepIndex(),
  );

  readonly steps = computed(() => this.aclService.steps());

  readonly season = computed(() => this.aclService.season());

  readonly buttons = computed(() => this.aclService.buttons());

  readonly routeListenerReady = signal<boolean>(false);

  constructor(
    public aclService: ApplicationFormLayoutService,
    private destroyRef: DestroyRef,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.aclService
      .initRouteButtonsListener$(this.route)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.routeListenerReady.set(true);
      });

    this.aclService
      .initNext$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.aclService
      .initBack$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.aclService
      .initCancel$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    this.aclService
      .initSend$()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.aclService.initCurrentIndex();

    this.router.navigate([], { onSameUrlNavigation: 'reload' });
  }

  ngOnDestroy(): void {
    this.aclService.clearState();
  }

  public onCancel(): void {
    this.aclService.cancel$.next();
  }

  public onBack(): void {
    this.aclService.back$.next();
  }

  public onNext(): void {
    this.aclService.next$.next();
  }

  public onSend(): void {
    this.aclService.send$.next();
  }
}
