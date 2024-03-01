
import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
export const routes = [
    {
        path: '', component: HomeComponent,
        //canActivate:[AuthGuard]
    }
];