import {Component, OnDestroy, OnInit} from '@angular/core';
import {MedicoService} from "../../../services/medico.service";
import {Medico} from "../../../models/medico.model";
import Swal from "sweetalert2";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";
import {BusquedasService} from "../../../services/busquedas.service";



@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor(private medicosService: MedicoService,
              private modalImagenService: ModalImagenService,
              private busqueda: BusquedasService) { }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img =>
      { this.cargarMedicos() } );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  // metodo para cargar todos los medicos
  cargarMedicos(){

    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe(
      medicos => {
        this.cargando = false;
        this.medicos = medicos; // el this.medicos hace ref al elemento declarado como lista vacia y el segundo hospitales es la respuesta del subscribe
      }
    );
  }

  // metodo para guardar hospital cuando se edita
  eliminarMedico(medico: Medico){
    Swal.fire({
      title: 'Esta Seguro?',
      text: `Desea elmininar a ${medico.nombre} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this.medicosService.eliminarMedico( medico._id )
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire(
              'Borrado!',
              'Medico Eliminado correctamente',
              'success'
            );
          });
      }
    });
  }

  // metodo para cambiar la imagen del medico
  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  // metodo de busqueda
  buscar(termino: string){

    if (termino.length === 0){
      return this.cargarMedicos();
    }

    this.busqueda.buscar('medicos', termino)
      .subscribe(resp => {
        this.medicos = resp;
      });
  }

}
