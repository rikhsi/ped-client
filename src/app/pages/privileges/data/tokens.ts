import { InjectionToken } from '@angular/core';
import { Certificate, SalarySupplement } from '@api/models';
import { SListService } from '@shared/services';

export const NATIONAL_CERT_LIST = new InjectionToken<SListService<Certificate>>(
  'NATIONAL_CERT_LIST',
);

export const STC_CERT_LIST = new InjectionToken<SListService<Certificate>>(
  'STC_CERT_LIST',
);

export const USTAMA_LIST = new InjectionToken<SListService<SalarySupplement>>(
  'USTAMA_LIST',
);
