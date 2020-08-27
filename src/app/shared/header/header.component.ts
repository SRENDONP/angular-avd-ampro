import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent  {

  public usuario: Usuario;

  constructor(private usuarioService: UsuarioService,
              private router: Router) { // el router es el que me permite navegar

    this.usuario = usuarioService.usuario;


   }

  logout(){
    this.usuarioService.logout();
  }


  buscar(termino: string){

    if (termino.length === 0){
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl(`/dashboard/buscar/${termino}`); // esto me permite navegar cuando de enter en la barra de busqueda
    }
  }

}
