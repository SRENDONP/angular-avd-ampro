import { Component, OnDestroy} from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 
    
  

  // this.retornaObservable().pipe(
  //   retry()).subscribe(
  //   valor => console.log('tick', valor),
  //   error => console.warn('error', error),
  //   () => console.info('observable terminado')
  // ); esta es una prueba del observable


  //esta es una prueba del interval
    this.intervalSubs = this.retornaIntervalo().subscribe((valor)=>console.log(valor));

}
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

retornaIntervalo(){

  return interval(1000)
    .pipe(
        map(valor => valor + 1 ),// el map lo que hace es que a valor le suma 1 y sabe que es valor por la funcion interval
        filter(valor => (valor % 2 === 0 )? true:false), // este operador ternario lo que hace es dividir el valor por 2 si es par lo deja pasar si no, no lo muestra
        take(100) //este operador solo va a realizar la repeticion 4 veces por que eso es lo que le estoy indicando
      
      );
}


retornaObservable(){

  let i = 0;
  
  const obs$ = new Observable<number>(observer =>{

    const intervalo = setInterval(() =>{
      i++;
      observer.next(i) //=> el next es cuando se ejecuta el observable,osea cuando la respuesta es efectiva es con next

      if (i === 4){ // esta funcion esta indicando que cuando el valor de i sea 4 entonces limpie la variable intervalo
        clearInterval(intervalo);
        observer.complete();//este complete retorna un void que basicamente es la finalizacion del observable
      }

      if (i === 2 ){ //si i llega al valor de 2 lo termina de manera abrupta, y lanza el error
        //console.log('i llego a 2 error');
        observer.error('i llego a 2 entonces dispare el error');
      }

    },1000)
  });

  return obs$

}

}
