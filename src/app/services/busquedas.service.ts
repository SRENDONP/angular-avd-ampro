import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from '../../environments/environment';
import { map } from 'rxjs/operators';
import {Usuario} from "../models/usuario.model";
import {Hospital} from "../models/hospital.model";
import {Medico} from "../models/medico.model";

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})



export class BusquedasService {

  constructor(private http: HttpClient) { }


  // aqui hago el get token del local storage
  get token(): string{
    return localStorage.getItem('token') || ''; // aqui recupero el token del localstorage para proteger la paginas si el usuario no esta logueado
  }


  //aqui obtengo los headers para las peticiones
  get headers(){
    return { headers: {
        'x-token': this.token}
    };
  }

  //aqui hago la tranformacion de la data de tipo any a usuario
  private transformarUsuarios(resultados: any[]): Usuario[]{
    return resultados.map(
      user => new Usuario
      (user.nombre, user.email,'', user.img, user.google, user.role, user.uid )
    );
  }

  //aqui hago la tranformacion de la data de tipo any a hospital
  private transformarHospitales(resultados: any[]): Hospital[]{
    return resultados
  }

  //aqui hago la tranformacion de la data de tipo any a medico
  private transformarMedicos(resultados: any[]): Medico[]{
    return resultados
  }

  //funcion para realizar busquedas
  buscar(
    tipo: 'usuarios'|'medicos'|'hospitales',
    termino: string) {

    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuarios(resp.resultados);

            case 'hospitales':
              return this.transformarHospitales(resp.resultados);

            case 'medicos':
              return this.transformarMedicos(resp.resultados);

          }
        })
      );
  }
}
