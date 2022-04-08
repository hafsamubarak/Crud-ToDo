import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentictionService } from '../service/authentiction.service';

@Injectable({
  providedIn: 'root',
})
export class SignInGuardGuard implements CanActivate {
  constructor(
    public authService: AuthentictionService,
    private router: Router
  ) {}
  //guard to prevent the logged in user from visitng the signup/ log in/ or landing page
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user = localStorage.getItem('user');
    if (user != null) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
