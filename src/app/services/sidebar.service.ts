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
      {titulo:'ProgressBar', url:'progress'},
      {titulo:'Graficas', url:'grafica1'},
    ]
    }
  ]

  constructor() { }
}
