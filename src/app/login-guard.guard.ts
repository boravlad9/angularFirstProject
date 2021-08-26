import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardGuard implements CanActivate {

  constructor(private authService: LoginServiceService, private router: Router) {}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
      const url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): true|UrlTree {
    if (this.authService.getLoggedIn()) { return true; }
    return this.router.parseUrl('/login');
  }

}
