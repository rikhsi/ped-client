import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/configs';
import { AppComponent } from './app/app';
import { register } from 'swiper/element/bundle';

register();
bootstrapApplication(AppComponent, appConfig);
