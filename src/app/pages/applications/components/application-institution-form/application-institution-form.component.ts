import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  EduDirection,
  DistrictShortItem,
  InstitutionShortItem,
  RegionShortItem,
} from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';
import { InstitutionForm } from '@pages/applications/models';
import { ItemComponent, SelectDefaultComponent } from '@shared/components';
import { EnumItemPipe } from '@shared/pipes';
import { NzOptionComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'ped-application-institution-form',
  imports: [
    ItemComponent,
    NzOptionComponent,
    EnumItemPipe,
    SelectDefaultComponent,
    ReactiveFormsModule,
    TranslocoDirective,
  ],
  templateUrl: './application-institution-form.component.html',
  styleUrl: './application-institution-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationInstitutionFormComponent {
  readonly regions = input<RegionShortItem[]>([]);
  readonly districts = input<DistrictShortItem[]>([]);
  readonly eduDirections = input<EduDirection[]>([]);
  readonly institutions = input<InstitutionShortItem[]>([]);

  readonly isRegionLoading = input<boolean>(false);
  readonly isDistrictLoading = input<boolean>(false);
  readonly isDirectionLoading = input<boolean>(false);
  readonly isInstitutionLoading = input<boolean>(false);

  get form(): FormGroup<InstitutionForm> {
    return this.fgDirective.form;
  }

  constructor(private fgDirective: FormGroupDirective) {}
}
