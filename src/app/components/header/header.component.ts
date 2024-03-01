import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [NgIf, LogoutButtonComponent, UserProfileComponent, LoginButtonComponent, AsyncPipe]
})
export class HeaderComponent {

  auth: AuthService = inject(AuthService);
}
