import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AvatarModule } from 'primeng/avatar'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  /**
   *
   */
  auth: AuthService = inject(AuthService)
}
