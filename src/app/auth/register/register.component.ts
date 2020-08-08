import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {


  public formSubmitted = false;


/**el manejo de formularios reactivos me permite administralos desde el compoenent sin necesidad de recargar el html
 * es necesario el formbuilder e importar el modulo ReactiveFormModule en el module respectivo
 */
  public registerForm = this.fb.group({
    nombre:['Sebastian', [Validators.required]], //los validator los pongo entre corchetes cuando tengo mas de dos 
    email:['srendon@gmail.com', [Validators.required, Validators.email]],
    password:['123456', [Validators.required]],
    password2:['123456', [Validators.required]],
    terminos:[false, Validators.requiredTrue]
  }, {
    validators: this.passwordsIguales('password','password2')
  });

  constructor(public fb:FormBuilder, 
              private usuarioService: UsuarioService, 
              private router: Router,) { }

  crearUsuario(){

    this.formSubmitted = true;

    console.log(this.registerForm.value);

    if (this.registerForm.invalid){
      return;
    }
    
    //realizar posteo

    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe(resp => {
        //TODO:MOVER AL DASHBOARD
        this.router.navigateByUrl('/');  
      }, (err) => {
        //sweet alert para mostrar el error que retorna el backend
        Swal.fire('Error', err.error.msg,'error');

      });



  }

  //aqui valido que el campo nombre sea valido, sino la variable formsubmitted va a ser false
  campoNoValido(campo:string):boolean{
    if (this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
  }else{
    return false;
  }
}

//Validacion que las contraseñas sean iguales

contrasenasNoValidas(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;

  if ((pass1 !== pass2) && this.formSubmitted){
    return true; //retorno true por que las contraseñas no son validas
  }else{
    return false;
  }

}

//aceptar terminos si postea el formulario y terminos esta en false, muestra el mensaje de error que esta en el html
aceptaTerminos(){
  return !this.registerForm.get('terminos').value && this.formSubmitted;
}

passwordsIguales(pass1Name:string, pass2Name:string){

    return (formGroup:FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors( {noEsIgual: true} )
      }
    }
}



}
