import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios)
    });

    //esto es un ejemplo de como se usan las promesas
  //   const promesa = new Promise((resolve, reject)=>{

  //     if(false){
  //       resolve('esto es el resolve');
  //     }else{
  //       reject ('esto es el reject');
  //     }
  //   });
    
  //   promesa.then((mensaje)=>{
  //     console.log(mensaje);
  //   }).catch(error => console.log('error en la promesa', error ));

  //   console.log('saludo desde el oninit')
  }

  getUsuarios(){

    const promesa = new Promise(resolve =>{
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
      });
      return promesa;

  }
}
