import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Este servicio es el que me maneja toda las opciones del dashboard desde la navegabilidad
export class SidebarService {

  menu:any[] = [
    {titulo: 'Dashboard',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo:'Main', url:'/'},
        {titulo:'Graficas', url:'grafica1'},
        {titulo:'ProgressBar', url:'progress'},
        {titulo:'Promesas', url:'promesas'},
        {titulo:'Rxjs', url:'rxjs'},
      ]
    },

    {titulo: 'Mantenimiento',
      icono:'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuarios', url:'usuarios'}, //el nombre de la url debe coincidir con el de el archivo routing
        {titulo:'Hospitales', url:'hospitales'},
        {titulo:'Medicos', url:'medicos'},
      ]
    }
  ]

  constructor() { }
}
