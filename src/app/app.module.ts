import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './compartida/header/header.component';
import { FooterComponent } from './compartida/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {LoginComponent} from './auth/login/login.component';
import { NavComponent } from './compartida/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { MostrarComponent } from './compartida/mostrar/mostrar.component'
=======
//import { NuevoComponent } from './pages/nuevo/nuevo.component'
import { NuevaRnComponent } from './pages/nueva-rn/nueva-rn.component'
import { MostrarComponent } from './pages/mostrar/mostrar.component'
>>>>>>> master

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
<<<<<<< HEAD
    NuevoComponent,
=======
    //NuevoComponent,
    NuevaRnComponent,
>>>>>>> master
    MostrarComponent,
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //FontAwesomeModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
