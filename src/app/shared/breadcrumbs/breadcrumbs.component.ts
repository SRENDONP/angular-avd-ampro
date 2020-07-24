import { Component, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {

    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe( ({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${ titulo }`; 
    
  });
    
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }
  
  getArgumentosRuta(){
    return this.router.events // con esto filtro la info que tengo en el pages routing, debo hacer todos estos pasos para acceder al titulo que voy a poer
    .pipe( // en cada pagina 
      filter( event => event instanceof ActivationEnd), // aqui filtro solo por el instance of que necesito
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map( (event: ActivationEnd) => event.snapshot.data),


      );
  }
  

}
