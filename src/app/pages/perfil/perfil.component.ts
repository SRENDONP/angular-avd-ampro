import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTem: any = null;


  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private fileUploadService: FileUploadService) {

    this.usuario = usuarioService.usuario; // esto es para que me cargue los datos de el usuario registrado en en la parte superior derecha
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({ //con esto defino los campos que va a tener el perfil form que voy a trabajar
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp =>{

      const {nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Perfil Modificado Correctamente','success');
    },( err ) => {

      Swal.fire('Error', err.error.msg,'error');

    })
  }

  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTem = null;
    }

    const reader = new FileReader(); //esto ya es propio de angular es para cambiar la imagen en tiempo real apenas yo suba una
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTem = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen Cargada Correctamente', 'success');
      }).catch(err => {
      console.log(err);
      Swal.fire('Guardado', 'Imagen Cargada Correctamente', 'success');
    })
  }

  }
