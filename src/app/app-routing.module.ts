import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './authentication/forget-password/forget-password.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { HomeComponent } from './components/home/home.component';
import { EditTodoComponent } from './components/home/Todo/edit-todo/edit-todo.component';
import { TodoAddComponent } from './components/home/Todo/todo-add/todo-add.component';
import { TodoListComponent } from './components/home/Todo/todo-list/todo-list.component';
import { AuthGuard } from './guard/auth.guard';
import { SignInGuardGuard } from './guard/sign-in-guard.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent,canActivate:[SignInGuardGuard]},
  {path:'signup',component:SignupComponent,canActivate:[SignInGuardGuard]},
  {path:'login',component:LoginComponent,canActivate:[SignInGuardGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'verify-email-address',component:VerifyEmailComponent},
  {path:'forgot-password',component:ForgetPasswordComponent},
  {path:'todoAdd',component:TodoAddComponent},
  {path:'todoList',component:TodoListComponent},
  {path:'editTodo/:id',component:EditTodoComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
