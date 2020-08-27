import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BusquedasService} from "../../services/busquedas.service";
import {Usuario} from "../../models/usuario.model";
import {Medico} from "../../models/medico.model";
import {Hospital} from "../../models/hospital.model";

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html'

})
export class BusquedasComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];



  constructor( private activatedRoute: ActivatedRoute,
               private busquedasServie: BusquedasService) { }

  ngOnInit(): void {

    this.activatedRoute.params // con el params lo que hago es tomar el valor que voy a buscar pero por la url
      .subscribe(
      ({termino}) => this.busquedasGlobal( termino )); //aqui le estoy enviando el termino a la funcion busqueda global para que se ejecute en el service
  }

  busquedasGlobal( termino: string ){
   this.busquedasServie.busquedaGlobal(termino)
     .subscribe((resp: any) => { //resp ya tiene un arreglo de arreglos con los elementos encontrados
       console.log(resp);
       this.usuarios = resp.usuarios;
       this.medicos = resp.medicos;
       this.hospitales = resp.hospitales;
     });
  }
}
