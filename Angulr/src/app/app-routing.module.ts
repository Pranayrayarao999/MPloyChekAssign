import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminDataComponent } from './admin-data/admin-data.component';
import { GeneralUsrDataComponent } from './general-usr-data/general-usr-data.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path:'Home',component: HomeComponent},
  {path:'Login', component: LoginComponent},
  {path:'Admin', component:AdminDataComponent},
  {path:'GUser',component: GeneralUsrDataComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
