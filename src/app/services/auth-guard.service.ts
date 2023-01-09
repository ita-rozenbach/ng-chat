import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor( private authService: AuthService, private router: Router ) { }
  canActivate() {
    return this.authService.isLoggedIn().pipe(
      tap((isUserLoggedIn) =>{ 
        console.log(isUserLoggedIn);
        if(!isUserLoggedIn){
          this.router.navigate(['/']);
        }
      })
    )
  }
}
