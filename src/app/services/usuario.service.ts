import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url; //estoy importando la base url que defini en las varialbes de entorno y las asigno a una  constante

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  public usuario:Usuario;

  constructor( private http: HttpClient,
              private router:Router,
              private ngZone:NgZone ) { 

      this.googleInit();
      }

  //aqui hago el get token del local storage
  get token():string{
    return localStorage.getItem('token') || ''; // aqui recupero el token del localstorage para proteger la paginas si el usuario no esta logueado
  }

  //aqui obtengo el uid del usaurio logueado
  get uid(){
    return this.usuario.uid || '';
  }


  googleInit(){

    return new Promise(resolve => {
      
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '183000698718-e4kdbuc6acl8vcmcovofslkl2fr7inra.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    })
  }

  //funcion logout
  logout(){
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
    });

  }


  //Funcion de Validacion de Token
  validarToken(): Observable<boolean>{
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const {
          email,
          google,
          nombre,
          role,
          img ='',
          uid
        } = resp.usuario; //aqui desestructuro las propiedades del objeto usuario
        
        this.usuario = new Usuario (nombre, email,'',img,google, role,uid)  //aqui creo mi instancia de usuario
        localStorage.setItem('token', resp.token); //aqui estoy guardando el token del backen en el localstorage
        return true;
    }),
    catchError(error => of (false) )
    );
  }

  //Funcion de Creacion de Usuario
  crearUsuario(formData:RegisterForm){ //este register form sale de la interface register form y es para manejar el tipado de datos 

    return this.http.post(`${base_url}/usuarios`, formData) // de esta manera estoy haciendo el post para crear el usuarioesta instruccion me retorna un observable con la respuesta del backend
    .pipe(tap((resp:any) =>{ // el tap es para ejecutar otra instruccion adicional aparte del login
      localStorage.setItem('token', resp.token); //aqui estoy guardando el token del backen en el localstorage
    })
  );                                      

  }

  //Servicio para actualizar un perfil de usuario
  actualizarPerfil(data: {email: string, nombre: string, role:string}){ //aqui le defino una variable data con la estructura
    
    data = {...data,
    role:this.usuario.role
  };
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {headers: {
      'x-token': this.token}
    });
  }


  //Funcion de login
  login(formData:LoginForm){ //este login form sale de la interface login form y es para manejar el tipado de datos 

    return this.http.post(`${base_url}/login`, formData) // de esta manera estoy haciendo el post para el logueo esta instruccion me retorna un observable con la respuesta del backend
    .pipe(tap((resp:any) =>{ // el tap es para ejecutar otra instruccion adicional aparte del login
      localStorage.setItem('token', resp.token); //aqui estoy guardando el token del backen en el localstorage
  })
  );  
  }

  //funcion de login con google
  loginGoogle(token){ //este login form sale de la interface login form y es para manejar el tipado de datos 

    return this.http.post(`${base_url}/login/google`, {token}) // de esta manera estoy haciendo el post para el logueo esta instruccion me retorna un observable con la respuesta del backend
    .pipe(tap((resp : any) =>{ // el tap es para ejecutar otra instruccion adicional aparte del login
      localStorage.setItem('token', resp.token); //aqui estoy guardando el token del backen en el localstorage
  })
  );  
  }
}
