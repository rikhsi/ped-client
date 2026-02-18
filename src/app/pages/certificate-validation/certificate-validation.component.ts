import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  CertificateSearchComponent,
  CertificateDetailsComponent,
} from './components';
import { LogoComponent } from '@shared/components';
import { Router } from '@angular/router';
import { SListService } from '@shared/services';
import { CertificateValidationService } from './certificate-validation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CertificateSearchParams } from './models';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'ped-certificate-validation',
  standalone: true,
  imports: [
    TranslocoDirective,
    NzButtonModule,
    NzIconModule,
    LogoComponent,
    CertificateSearchComponent,
    CertificateDetailsComponent,
  ],
  templateUrl: './certificate-validation.component.html',
  styleUrl: './certificate-validation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SListService, CertificateValidationService],
})
export class CertificateValidationComponent implements OnInit {
  readonly isLoading = computed(() => this.cvService.isLoading());
  readonly serials = computed(() => this.cvService.serials());
  readonly certificate = computed(() => this.cvService.certificate());

  constructor(
    private router: Router,
    private cvService: CertificateValidationService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.cvService.initSerial$().subscribe();

    this.cvService
      .initFormChange$()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          return of(null);
        }),
      )
      .subscribe();
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSearch(params: CertificateSearchParams): void {
    this.cvService.form.patchValue({
      ...params,
    });
  }
}
