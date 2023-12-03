import { Component } from '@angular/core';
import { Usuario } from 'src/app/services/auth/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {
  cuadroVisible: string | null;  // Inicializar con null o algún otro valor inicial
  //se agrego la funcionalidad de cerrar sesion
  usuarioLogeado:boolean = false;
userData?:Usuario;
  constructor(private loginService: LoginService) {
    this.cuadroVisible = null;
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

