import {Routes, RouterModule}  from  '@angular/router'
import { NgModule } from '@angular/core'
import { AuthGuard } from '../guards/auth.guard';
import {AdminGuard} from '../guards/admin.guard';

import { PagesComponent } from './pages.component';




const routes: Routes = [
    {
        path: 'dashboard', //esto me indica que siempre que vaya a otra pag diferente al dashboard, en la url me deje el dashboard y luego la otra pagina
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad:[AuthGuard],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
      },

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule{}
