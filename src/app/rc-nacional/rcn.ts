export class Rcn {
    id?: number;
    reunion: string;
    ciudad: string;
    fechaInicio: string;
    expositor: string;
    tituloTrabajo: string;
    autor: string;
  
    constructor(id: number, reunion: string, ciudad: string, fechaInicio: string, expositor: string, tituloTrabajo: string, autor: string) {
      this.id = id;
      this.reunion = reunion;
      this.ciudad = ciudad;
      this.fechaInicio = fechaInicio;
      this.expositor = expositor;
      this.tituloTrabajo = tituloTrabajo;
      this.autor = autor;
    }
  }