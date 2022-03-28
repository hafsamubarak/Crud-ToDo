import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentictionService } from './service/authentiction.service';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { TodoAddComponent } from './components/home/Todo/todo-add/todo-add.component';
import { TodoListComponent } from './components/home/Todo/todo-list/todo-list.component';
import { CardComponent } from './components/home/Todo/card/card.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    LandingPageComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    TodoAddComponent,
    TodoListComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [AuthentictionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
