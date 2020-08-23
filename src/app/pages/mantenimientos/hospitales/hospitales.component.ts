import {Component, OnDestroy, OnInit} from '@angular/core';
import {HospitalService} from "../../../services/hospital.service";
import {Hospital} from "../../../models/hospital.model";
import Swal from "sweetalert2";
import {ModalImagenService} from "../../../services/modal-imagen.service";
import {delay} from "rxjs/operators";
import {Subscription} from "rxjs";
import {BusquedasService} from "../../../services/busquedas.service";

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busqueda: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img =>
      { this.cargarHospitales() } );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  // metodo para cargar todos los hospitales
  cargarHospitales(){

    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe(
      hospitales => {
        this.cargando = false;
        this.hospitales = hospitales; // el this.hospitales hace ref al elemento declarado como lista vacia y el segundo hospitales es la respuesta del subscribe
      }
    );
  }

  // metodo para guardar hospital cuando se edita
  guardarCambiosHospital(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe( resp =>{
        Swal.fire(
          'Actualizado!',
          'Hospital actualizado correctamente',
          'success'
        );
      });
  }

  // metodo para guardar hospital cuando se edita
  eliminarHospital(hospital: Hospital){
    this.hospitalService.eliminarHospital(hospital._id)
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire(
          'Eliminado!',
          'Hospital eliminado correctamente',
          'success'
        );
      });
  }

  async abrirSweetAletr(){
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });
    if (value.trim().length > 0){
      this.hospitalService.crearHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push( resp.hospital);
        });
    }
  }

  // metodo para cambiar la imagen del hopital
  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }


  // metodo de busqueda
  buscar(termino: string){

    if (termino.length === 0){
      return this.cargarHospitales();
    }

    this.busqueda.buscar('hospitales', termino)
      .subscribe(resp => {
        this.hospitales = resp;
      });
  }


}
