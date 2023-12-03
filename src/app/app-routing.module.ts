import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
<<<<<<< HEAD
import { MostrarComponent } from './compartida/mostrar/mostrar.component';

=======
import { PaginaPrincipalComponent } from './pages/pagina-principal/pagina-principal.component';
import { NuevaRnComponent }from './pages/nueva-rn/nueva-rn.component';
import { MostrarComponent }from './pages/mostrar/mostrar.component';
>>>>>>> master
//le agrego las rutas
const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio',component:DashboardComponent},
  {path:'iniciar-sesion',component:LoginComponent},
<<<<<<< HEAD
  {path: 'mostrar', component: MostrarComponent }
=======
  {path:'pagina-principal',component:PaginaPrincipalComponent},
  {path:'nueva-reunion',component:NuevaRnComponent},
  {path:'mostrar',component:MostrarComponent},
>>>>>>> master
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
