import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad} from '@angular/router';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private usuarioService: UsuarioService,
              private router: Router){

  }

  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    return this.usuarioService.validarToken()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado){
            this.router.navigateByUrl('/login'); //esto se dispara si esta autenticado esta en falso
          }
        })
      );
    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){


    return this.usuarioService.validarToken()
    .pipe(
      tap(estaAutenticado => {
      if (!estaAutenticado){
        this.router.navigateByUrl('/login'); //esto se dispara si esta autenticado esta en falso
        }
      })
    );
  }

}
