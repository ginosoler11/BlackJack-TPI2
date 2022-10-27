import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './blackjack/game/game.component';
import { CartasComponent } from './blackjack/cartas/cartas.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';

import { CookieService } from 'ngx-cookie-service';
import { LoginGuardian } from './login/login-guardian';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CartasComponent,
    ErrorComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [LoginService, CookieService, LoginGuardian],
  bootstrap: [AppComponent],
})
export class AppModule {}
