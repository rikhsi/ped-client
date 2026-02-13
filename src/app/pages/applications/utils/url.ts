import { RouterStateSnapshot } from '@angular/router';

export function cropApplicationUrlFromGuard(
  state: RouterStateSnapshot,
  url: string,
): string[] {
  const segments = state.url.split('/').slice(0, -1);
  segments.push(url);

  return segments;
}
