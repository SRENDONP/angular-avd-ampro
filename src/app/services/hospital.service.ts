import { Injectable } from '@angular/core';
import {CargarUsuario} from '../interfaces/cargar-usuarios.interface';
import {delay, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Hospital} from '../models/hospital.model';


const base_url = environment.base_url; // estoy importando la base url que defini en las varialbes de entorno y las asigno a una  constante


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // aqui hago el get token del local storage
  get token(): string{
    return localStorage.getItem('token') || ''; // aqui recupero el token del localstorage para proteger la paginas si el usuario no esta logueado
  }

  // aqui obtengo los headers para las peticiones
  get headers(){
    return { headers: {
        'x-token': this.token}
    };
  }


  // Metodo GET Para Cargar los Hospitales
  cargarHospitales(){
    const url = `${base_url}/hospital`;

    return this.http.get(url, this.headers)
      .pipe(map((resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales));

  }

  // Metodo POST Para Crear Hospitales
  crearHospital(nombre: string){
    const url = `${base_url}/hospital`;

    return this.http.post(url, {nombre}, this.headers);
  }

  // Metodo PUT Para editar Hospitales
  actualizarHospital( _id: string, nombre: string){

    const url = `${base_url}/hospital/${_id}`;
    return this.http.put(url, {nombre}, this.headers);
  }

  // Metodo DELETE Para eliminar Hospitales
  eliminarHospital( _id: string){

    const url = `${base_url}/hospital/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
