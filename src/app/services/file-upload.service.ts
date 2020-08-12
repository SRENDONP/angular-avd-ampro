import { Injectable, ChangeDetectorRef } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  constructor() {
    
   }

  //cargar las imagenes

  async actualizarFoto(archivo:File, tipo:'usuarios'|'medicos'|'hospitales', id:string){ //aqui le envio los datos que require la carga de imagen
    
    try {
        const url = `${base_url}/upload/${tipo}/${id}`; //aqui construyo el url con los datos que necesito, es como se hace en postman 
        const formData = new FormData(); //estp es propio de javascript y es para construir la data que voy a enviar

        formData.append('imagen', archivo);

        const resp = await fetch(url, {
          method:'PUT', //esto lo pongo asi como lo defini en el backend, en postman
          headers: {
            'x-token': localStorage.getItem('token')||''
          },
          body:formData
        });

        const data = await resp.json();

        if (data.ok){
          return data.nombreArchivo;
        }else{
          return false;
        }

        
        

        return true;
        

    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
