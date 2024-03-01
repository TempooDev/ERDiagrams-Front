import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-logout-button',
    templateUrl: './logout-button.component.html',
    styleUrls: ['./logout-button.component.scss'],
    standalone: true,
    imports: [MatButtonModule],
})
export class LogoutButtonComponent implements OnInit {
  /**
   *
   */
  public auth: AuthService = inject(AuthService);
  public document: Document = inject(DOCUMENT)


  ngOnInit(): void { }
}
