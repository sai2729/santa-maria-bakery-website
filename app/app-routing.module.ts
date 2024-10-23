import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPageComponent } from './new-page/new-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component:HomeComponent  },
  { path: 'home', component:HomeComponent  },
  { path: 'new-page', component: NewPageComponent },
  { path: 'login', component: LoginComponent }
  // 其他路由配置
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
