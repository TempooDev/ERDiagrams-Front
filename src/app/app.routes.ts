import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { JoinRoomComponent } from './components/join-room/join-room.component';
export const routes = [
  {
    path: '',
    component: HomeComponent,

    // canActivate: [AuthGuard]
  },
  { path: 'join', component: JoinRoomComponent },
  { path: 'home', component: HomeComponent },
];
