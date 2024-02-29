import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { BoardComponent } from './components/board/board.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

const appRoutes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    UserProfileComponent,
    BoardComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-va85m1jw6xjmlb5z.eu.auth0.com',
      clientId: '7UTu83vCfuoiyCFbt843mS55q3lH8BoJ',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
