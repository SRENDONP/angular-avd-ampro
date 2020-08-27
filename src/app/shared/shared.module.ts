import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports:[
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule // el formmodule permite que angular tome control de formulario sin refrescar la pagina cada que se hagan un cambio
  ]
})
export class SharedModule { }
