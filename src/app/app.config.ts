import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ChunckErrorHandleService } from './services/chunck-error-handle.service';
import { VersionCheckService } from './services/version-check.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: ErrorHandler,
      useClass: ChunckErrorHandleService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return inject(VersionCheckService).start();
      },
    },
  ],
};
