import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FaqComponent,
  HeroSectionComponent,
  SeasonsSectionComponent,
  StatisticsComponent,
} from './components';
import { provideNzIconsPatch } from 'ng-zorro-antd/icon';
import {
  PlusOutline,
  MinusOutline,
  RightOutline,
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'ped-landing',
  imports: [
    HeroSectionComponent,
    SeasonsSectionComponent,
    StatisticsComponent,
    FaqComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNzIconsPatch([PlusOutline, MinusOutline, RightOutline])],
})
export class LandingComponent {}
