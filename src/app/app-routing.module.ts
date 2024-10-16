import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPageComponent } from './new-page/new-page.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component:HomeComponent  },
  { path: 'home', component:HomeComponent  },
  { path: 'new-page', component: NewPageComponent },
  // 其他路由配置
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
