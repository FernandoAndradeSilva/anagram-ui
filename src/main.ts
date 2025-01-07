import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import {bootstrapApplication} from "@angular/platform-browser"; // Supondo que você tenha um arquivo de configuração separado

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));
