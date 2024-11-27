import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartpageComponent } from './startpage/startpage.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
