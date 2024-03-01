import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss'],
})
export class LoginButtonComponent implements OnInit {
  /**
   *
   */
  auth: AuthService = inject(AuthService)
  ngOnInit(): void { }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
}
