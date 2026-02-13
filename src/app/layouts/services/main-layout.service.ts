import { Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getCurrentRouteData, getRootSnapshot } from '@shared/utils';
import { filter, Observable, tap } from 'rxjs';

@Injectable()
export class MainLayoutService {
  readonly showNavigation = signal<boolean>(false);
  readonly notificationList = signal<any[]>([]);
  constructor(private router: Router) {}

  public routeDataListener$(): Observable<Record<string, any>> {
    return this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      tap(() => {
        const snapshot = getRootSnapshot(this.router);
        const currentRouteData = getCurrentRouteData(snapshot);

        this.showNavigation.set(!currentRouteData['hideNavigation']);
      }),
    );
  }
}
