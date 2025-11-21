// src/app/core/guards/auth-guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserStoreService } from '../user-store.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private userStore: UserStoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // si hay usuario en UserStoreService → pasa
    if (this.userStore.isLoggedIn) {
      return true;
    }

    // si NO hay usuario → manda a login
    return this.router.parseUrl('/login');
  }
}
