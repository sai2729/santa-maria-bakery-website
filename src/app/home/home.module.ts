import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { StartpageComponent } from './startpage/startpage.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    StartpageComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
