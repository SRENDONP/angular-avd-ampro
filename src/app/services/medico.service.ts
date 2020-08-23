import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Medico} from '../models/medico.model';
import {map} from "rxjs/operators";


const base_url = environment.base_url; // estoy importando la base url que defini en las varialbes de entorno y las asigno a una  constante


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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


  // Metodo GET Para Cargar los Medicos
  cargarMedicos(){
    const url = `${base_url}/medico`;

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: {
          ok: boolean,
          medicos: Medico[]}) => resp.medicos));
  }

  // Metodo GET Para Cargar el medico por id
  cargarMedicosPorId(id: string){
    const url = `${base_url}/medico/${id}`;

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: {
          ok: boolean,
          medico: Medico[]}) => resp.medico));
  }


  // Metodo POST Para Crear Hospitales
  crearMedico(medico: {nombre: string, hospital: string}){
    const url = `${base_url}/medico`;

    return this.http.post(url, medico, this.headers); //aqui le envio toda el objeto por que el backend lo esta esperando
  }

  // Metodo PUT Para editar Hospitales
  actualizarMedico( medico: Medico){

    const url = `${base_url}/medico/${medico._id}`;
    return this.http.put(url, medico, this.headers);
  }

  // Metodo DELETE Para eliminar Hospitales
  eliminarMedico( _id: string){

    const url = `${base_url}/medico/${_id}`;
    return this.http.delete(url, this.headers);
  }
}
