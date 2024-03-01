import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/pages/home/home.component';
import { withDebugTracing, provideRouter, Routes } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { AuthModule } from '@auth0/auth0-angular';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [{ path: '', component: HomeComponent }];




bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(MatButtonModule, BrowserModule, AuthModule.forRoot({
            domain: env.auth.domain,
            clientId: env.auth.clientId,
            authorizationParams: {
                redirect_uri: window.location.origin,
            },
        })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(appRoutes, withDebugTracing()),
    ]
})
  .catch(err => console.error(err));
