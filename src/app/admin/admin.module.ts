import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ActionButtonRendererComponent } from './addproduct/action-button-renderer.component';


@NgModule({
  declarations: [
    AddproductComponent,
    ActionButtonRendererComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    AgGridModule
  ]
})
export class AdminModule { }
