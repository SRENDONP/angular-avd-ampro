import {Routes, RouterModule}  from  '@angular/router'
import { NgModule } from '@angular/core'
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
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

const routes: Routes=[
    {
        path: 'dashboard', //esto me indica que siempre que vaya a otra pag diferente al dashboard, en la url me deje el dashboard y luego la otra pagina
        component: PagesComponent,
        canActivate:[AuthGuard],
        children:[
          {path: '', component: DashboardComponent, data:{titulo:'Dashboard'}},
          {path: 'progress', component: ProgressComponent, data:{titulo:'Progress Bar'}},
          {path: 'grafica1', component: Grafica1Component, data:{titulo:'Graficas'}},
          {path: 'account-settings', component: AccountSettingsComponent, data:{titulo:'Configuración'}},
          {path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'}},
          {path: 'perfil', component: PerfilComponent, data:{titulo:'Perfil'}},
          {path: 'rxjs', component: RxjsComponent, data:{titulo:'Operadores RXJS'}},
          //{path: '', redirectTo:'/dashboard', pathMatch:'full'},

          //Rutas de Manternimientos
          {path: 'usuarios', component: UsuariosComponent, data:{titulo:'Usuarios'}},
          {path: 'hospitales', component: HospitalesComponent, data:{titulo:'Hospitales'}},
          {path: 'medicos', component: MedicosComponent, data:{titulo:'Medicos'}},
        ]
      },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule{}