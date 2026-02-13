import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PlaceCardComponent } from '@pages/place/components';
import { ExamLocationsApiService } from '@api/controllers';
import { Place } from '@api/models';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'ped-place-list',
  imports: [PlaceCardComponent, TranslocoDirective],
  templateUrl: './place-list.component.html',
  styleUrl: './place-list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceListComponent implements OnInit {
  private readonly placeService = inject(ExamLocationsApiService);

  readonly items = signal<Place[]>([]);

  ngOnInit(): void {
    this.initPlaces();
  }

  private initPlaces(): void {
    this.placeService
      .getPlaces$({ pageIndex: 0, pageSize: 100, filter: [], sort: [] })
      .subscribe(({ result: { items } }) => {
        this.items.set(items);
      });
  }
}
