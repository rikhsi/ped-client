import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
  provideAppInitializer,
} from '@angular/core';
import {
  provideRouter,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';

import { routes } from '../../app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  apiInterceptor,
  errorInterceptor,
  languageInterceptor,
  tokenInterceptor,
} from '@core/interceptors';
import { JwtModule } from '@auth0/angular-jwt';
import { provideTransloco } from '@jsverse/transloco';
import { DEFAULT_LANGUAGE, ENUM_ITEMS_TOKEN, Language } from '@constants';
import {
  enumItemsProvider,
  iconProvider,
  langProvider,
  TranslocoHttpLoader,
} from '@core/providers';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { ngZorroConfig } from '@core/configs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzI18n, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { provideYaConfig } from 'angular8-yandex-maps';

registerLocaleData(localeRu);

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withViewTransitions(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'ignore',
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(
      withInterceptors([
        apiInterceptor,
        languageInterceptor,
        tokenInterceptor,
        errorInterceptor,
      ]),
      withFetch(),
    ),
    importProvidersFrom(JwtModule.forRoot({})),
    provideYaConfig({
      apikey: 'API_KEY',
    }),
    provideTransloco({
      config: {
        availableLangs: [Language.UZ, Language.RU, Language.EN],
        defaultLang: DEFAULT_LANGUAGE,
        reRenderOnLangChange: false,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideNzI18n(ru_RU),
    provideAppInitializer(iconProvider()),
    provideAppInitializer(langProvider()),
    provideEnvironmentNgxMask(),
    provideNzConfig(ngZorroConfig),
    NzNotificationService,
    NzModalService,
    NzDrawerService,
    {
      provide: ENUM_ITEMS_TOKEN,
      useFactory: enumItemsProvider,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru-RU',
    },
  ],
};
