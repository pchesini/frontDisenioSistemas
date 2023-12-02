import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {
  cuadroVisible: string | null;  // Inicializar con null o algún otro valor inicial
  constructor() {
    this.cuadroVisible = null;
  }
  mostrarCuadro(idCuadro: string) {
    console.log(`Mostrando cuadro: ${idCuadro}`);
    this.cuadroVisible = this.cuadroVisible === idCuadro ? null : idCuadro;
    console.log(`Nuevo valor de cuadroVisible: ${this.cuadroVisible}`);
  }
}
