import { Component, OnInit, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;


/**el manejo de formularios reactivos me permite administralos desde el compoenent sin necesidad de recargar el html
 * es necesario el formbuilder e importar el modulo ReactiveFormModule en el module respectivo
 */
  public loginForm = this.fb.group({
    email:[localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    remember:[false]
  });

  constructor(private fb:FormBuilder, 
              private router: Router,
              private usuarioService: UsuarioService,
              private ngZone: NgZone){ }
  ngOnInit(): void {
    this.renderButton();
  }

  

  

  login(){
    //this.router.navigateByUrl('/');
    this.usuarioService.login(this.loginForm.value)
    .subscribe(resp => {
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email', this.loginForm.get('email').value);
      }else{
        localStorage.removeItem('email');
      }

      //TODO:MOVER AL DASHBOARD
      this.router.navigateByUrl('/');

    }, (err) => {
      //sweet alert para mostrar el error que retorna el backend
      Swal.fire('Error', err.error.msg,'error');

    });
    
    console.log(this.loginForm.value);
    

  }

  onSuccess(googleUser) {
    //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    
    //console.log(id_token);
    
  }


  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });

    this.startApp();
  }

  startApp = function() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '183000698718-e4kdbuc6acl8vcmcovofslkl2fr7inra.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };


  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          //console.log(id_token);
          this.usuarioService.loginGoogle(id_token).subscribe( resp => {
            
            this.ngZone.run(()=>{ // el ng zone es para ejecutar librerias externas a angular
              this.router.navigateByUrl('/');  
            })

          });



        
        },(error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
