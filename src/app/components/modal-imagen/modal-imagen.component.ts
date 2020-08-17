import { Component, OnInit } from '@angular/core';
import {ModalImagenService} from "../../services/modal-imagen.service";
import {Usuario} from "../../models/usuario.model";
import Swal from "sweetalert2";
import {FileUploadService} from "../../services/file-upload.service";

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public usuario: Usuario;
  public imagenSubir: File;
  public imgTem: any = null;

  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTem = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swal.fire('Guardado', 'Imagen Cargada Correctamente', 'success');
        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();
      }).catch(err => {
      console.log(err);
      Swal.fire('Guardado', 'Imagen Cargada Correctamente', 'success');
    })
  }


}
