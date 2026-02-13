import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslocoDirective } from '@jsverse/transloco';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationType, Season } from '@api/models';
import { EnumItemPipe } from '@shared/pipes';
import { EmptyComponent } from '@shared/components';
import { ApplicationRoute } from '@constants';
import { environment } from 'src/environments/environment';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ped-select-type',
  imports: [
    NzRadioModule,
    ReactiveFormsModule,
    NzButtonModule,
    TranslocoDirective,
    EnumItemPipe,
    RouterLink,
    EmptyComponent,
    NgClass,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit {
  readonly seasonControl = new FormControl(null, [Validators.required]);
  readonly activeSeasons = signal<Season[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initActiveSeasons();
  }

  openApplication(): void {
    const seasonId = this.seasonControl.getRawValue();
    const applicationType = this.activeSeasons().find(
      (season) => season.id === seasonId,
    )?.applicationType;

    switch (applicationType) {
      case ApplicationType.PROFESSIONAL: {
        window.open(environment.professionalApplicationUrl, '_blank');

        break;
      }
      default: {
        this.router.navigate(
          [ApplicationRoute.FORM, this.seasonControl.getRawValue()],
          { relativeTo: this.route.parent },
        );
      }
    }
  }

  private initActiveSeasons(): void {
    const activeSeasons: Season[] = this.route.snapshot.data['activeSeasons'];

    this.activeSeasons.set(Array.isArray(activeSeasons) ? activeSeasons : []);
  }
}
