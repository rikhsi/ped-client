import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';

/**
 * Возвращает самый "глубокий" активный маршрут (ActivatedRoute) из текущего дерева маршрутов.
 * Полезно, если нужно получить параметры, queryParams или data последнего вложенного маршрута.
 *
 * @param route - текущий ActivatedRoute
 * @returns Самый глубоко вложенный ActivatedRoute
 */
export function getDeepestActiveRoute(route: ActivatedRoute): ActivatedRoute {
  let current = route;

  // Проходим по всем дочерним маршрутам, пока есть firstChild
  while (current.firstChild) {
    current = current.firstChild;
  }

  return current;
}

/**
 * Возвращает корневой snapshot активного маршрута из состояния роутера.
 * Snapshot — это статичное состояние маршрута в данный момент.
 *
 * @param router - экземпляр Angular Router
 * @returns Корневой ActivatedRouteSnapshot
 */
export function getRootSnapshot(router: Router): ActivatedRouteSnapshot {
  return router.routerState.snapshot.root;
}

/**
 * Возвращает объект `data` самого глубокого маршрута из snapshot.
 * `data` — это объект, который можно задать в конфигурации маршрута:
 * { path: 'example', component: ExampleComponent, data: { title: 'Example' } }
 *
 * @param snapshot - корневой ActivatedRouteSnapshot
 * @returns Данные самого вложенного маршрута или пустой объект
 */
export function getCurrentRouteData(
  snapshot: ActivatedRouteSnapshot,
): Record<string, any> {
  let deepest: ActivatedRouteSnapshot = snapshot.root;

  // Проходим по всем дочерним snapshot, чтобы найти последний
  while (deepest.firstChild) {
    deepest = deepest.firstChild;
  }

  return deepest.data ?? {};
}
