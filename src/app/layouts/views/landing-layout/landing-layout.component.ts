import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideNzIconsPatch } from 'ng-zorro-antd/icon';
import { GlobalOutline } from '@ant-design/icons-angular/icons';
import {
  LandingFooterComponent,
  LandingHeaderComponent,
} from '@layouts/components';

@Component({
  selector: 'ped-landing-layout',
  imports: [LandingHeaderComponent, LandingFooterComponent, RouterOutlet],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNzIconsPatch([GlobalOutline])],
})
export class LandingLayoutComponent {}
