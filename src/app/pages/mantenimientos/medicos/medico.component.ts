import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {HospitalService} from '../../../services/hospital.service';
import {MedicoService} from '../../../services/medico.service';

import {Hospital} from '../../../models/hospital.model';
import {Medico} from '../../../models/medico.model';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup; // el FormGroup es para manejar los formulario reactivos, donde angular toma el control de validaciones y no el html
  public hospitales: Hospital[] = []; // aqui creo la variable de tipo cadena de hospitales

  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activateRoute: ActivatedRoute) { }  // para trabajar con formularios reactivos siempre debo usar el formbuilder

  ngOnInit(): void {
    // aqui tomo el control del formulario y las avlidaciones
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    // aqui obtengo el id directamente de la url
    this.activateRoute.params
        .subscribe(({id}) => this.cargarMedico( id ));


    // Cargar los hospitales del select
    this.cargarHospitales();

    // metodo para recuperar la imagen del hospital
    this.medicoForm.get('hospital').valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      });

  } //hasta aqui va el ngOnInit


  // cargar medico
  cargarMedico(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

    this.medicoService.cargarMedicoPorId( id )
      .pipe(
        delay(100)
      )
      .subscribe( (medico: Medico) => {

        if ( !medico ) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        const { nombre, hospital: { _id } } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      });

  }

  // metodo para cargar los hospitales que voy a asinar al medico
  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
          this.hospitales = hospitales;
      });
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;

    if (this.medicoSeleccionado){
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
        .subscribe( resp => {
          Swal.fire('Actualizado', `${nombre} Actualizado correctamente`, 'success');
        })


    }else{


      // aqui le envio la data que hay en el formularioy los capturo con el value
      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe((resp: any) => {
          Swal.fire('creado', `${nombre} Creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });

    }

  }


}
