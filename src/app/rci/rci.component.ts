import { Component } from '@angular/core';

@Component({
  selector: 'app-rci',
  templateUrl: './rci.component.html',
  styleUrls: ['./rci.component.css']
})
export class RciComponent {
  id!: number;
  reunion!:string;
  pais!: string;
  fechaInicio!: string;
  expositor!: string;
  tituloTrabajo!: string;
  autor!: string;

}
