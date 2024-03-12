
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
export const routes = [
    {
        path: '', component: HomeComponent,
        // canActivate: [AuthGuard]
    }
];