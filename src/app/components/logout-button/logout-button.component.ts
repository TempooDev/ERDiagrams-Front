import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent implements OnInit {
  /**
   *
   */
  public auth: AuthService = inject(AuthService);
  public document: Document = inject(DOCUMENT)


  ngOnInit(): void { }
}
