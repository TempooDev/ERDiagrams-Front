import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    standalone: true,
    imports: [NgIf, AsyncPipe],
})
export class UserProfileComponent {
  /**
   *
   */
  auth: AuthService = inject(AuthService)
}
