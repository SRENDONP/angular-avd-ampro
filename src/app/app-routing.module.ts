import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//pagina no encontrada
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

//Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';



const routes: Routes = [

  // path:'/dashboard' => pagesRouting
  // path:'/auth' => authRouting

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule,
  AuthRoutingModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }
