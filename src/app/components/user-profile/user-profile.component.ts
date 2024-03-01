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

  profileJson: string = null
  auth: AuthService = inject(AuthService)

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => this.profileJson = JSON.stringify(profile, null, 2))
  }
}
