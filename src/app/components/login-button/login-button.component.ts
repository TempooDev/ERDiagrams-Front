import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
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
