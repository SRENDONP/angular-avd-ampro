import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import {MedicoComponent} from './mantenimientos/medicos/medico.component';
import {BusquedasComponent} from './busquedas/busquedas.component';
import {RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "../guards/admin.guard";


const childRoutes: Routes=[
  {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
  {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuración'}},
  {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Graficas'}},
  {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
  {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'}},
  {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
  {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Operadores RXJS'}},
  //{path: '', redirectTo:'/dashboard', pathMatch:'full'},

  //Rutas de Manternimientos
  {path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
  {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico'}},
  {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
  {path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: {titulo: 'Usuarios'}},

  //Rutas de la barra de busqueda
  {path: 'buscar/:termino', component: BusquedasComponent, data: {titulo: 'Busquedas'}},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule {
}
