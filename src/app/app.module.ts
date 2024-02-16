import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './compartida/header/header.component';
import { FooterComponent } from './compartida/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {LoginComponent} from './auth/login/login.component';
import { NavComponent } from './compartida/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NuevaRnComponent } from './pages/nueva-rn/nueva-rn.component'
import { MostrarComponent } from './pages/mostrar/mostrar.component'
import { PaginaPrincipalComponent } from './pages/pagina-principal/pagina-principal.component';
import { RcNacionalComponent } from './rc-nacional/rc-nacional.component';
import { RcInternacionalComponent } from './rc-internacional/rc-internacional.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    NuevaRnComponent,
    MostrarComponent,
    PerfilComponent,
    PaginaPrincipalComponent,
    RcNacionalComponent,
    RcInternacionalComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    //NgModule,
    //FontAwesomeModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
