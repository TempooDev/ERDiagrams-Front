import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LogoutButtonComponent } from '../logout-button/logout-button.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { DiagramsService } from 'src/app/core/services/api/diagrams.service';
import { BoardService } from 'src/app/core/services/board.service';
import { EntityDB } from 'src/app/core/entities/entitydb';
import { MatButton } from '@angular/material/button';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    LogoutButtonComponent,
    UserProfileComponent,
    LoginButtonComponent,
    AsyncPipe,
    MatButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  auth: AuthService = inject(AuthService);
  _diagramService = inject(DiagramsService);
  _boardService = inject(BoardService);

  ngOnInit() {}
}
