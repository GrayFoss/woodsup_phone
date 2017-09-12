import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../utils/models/User';
import { UserService } from '../services/User.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userservice: UserService,
    private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    console.log(url);
    return this.checkLogin(url);
  }
  checkLogin(url: string): boolean {
    this.userservice.doLogout().then((res) => {
      if (res.status.error === 0) {
        return true;
      } else {
        return false;
      }
    });
    return true;
  }
}
