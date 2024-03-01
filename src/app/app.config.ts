import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthModule } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { environment as env } from 'src/environments/environment';
import { loggingInterceptor } from './interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {

    providers: [
        provideRouter(routes),
        importProvidersFrom(MatButtonModule, BrowserModule, AuthModule.forRoot({
            domain: env.auth.domain,
            clientId: env.auth.clientId,
            authorizationParams: {
                redirect_uri: window.location.origin,
            },
        })),
        provideAnimations(),
        provideHttpClient(withInterceptors([loggingInterceptor])),
        provideRouter(routes, withDebugTracing()),
    ]

}
