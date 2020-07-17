import {Routes, RouterModule}  from  '@angular/router'
import {NgModule} from '@angular/core'
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';

const routes: Routes=[
    {
        path: 'dashboard', //esto me indica que siempre que vaya a otra pag diferente al dashboard, en la url me deje el dashboard y luego la otra pagina
        component: PagesComponent,
        children:[
          {path: '', component: DashboardComponent},
          {path: 'progress', component: ProgressComponent},
          {path: 'grafica1', component: Grafica1Component},
          //{path: '', redirectTo:'/dashboard', pathMatch:'full'},
        ]
      },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule{}