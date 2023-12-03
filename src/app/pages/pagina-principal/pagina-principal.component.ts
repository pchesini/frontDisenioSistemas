import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/services/auth/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit, OnDestroy{
  cuadroVisible: string | null;  // Inicializar con null o algún otro valor inicial
  //se agrego la funcionalidad de cerrar sesion pero no cambia el nombre por "salir"
  usuarioLogeado:boolean = false;// true pero creo que deberia estar en true
  userData?:Usuario;
  constructor(private loginService: LoginService) {
    this.cuadroVisible = null;
  }
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(usuarioLogeado) =>{
        this.usuarioLogeado=usuarioLogeado;
      }
    })
    // esto se puede sacar
    this.loginService.currentUserData.subscribe({
      next:(userData) =>{
        this.userData=userData;
      }
    })
  }
  
  mostrarCuadro(idCuadro: string) {
    console.log(`Mostrando cuadro: ${idCuadro}`);
    this.cuadroVisible = this.cuadroVisible === idCuadro ? null : idCuadro;
    console.log(`Nuevo valor de cuadroVisible: ${this.cuadroVisible}`);
  }
  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
}
}

