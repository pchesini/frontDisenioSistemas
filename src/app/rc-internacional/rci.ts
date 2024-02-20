export class Rci {
    id?: number;
    reunion: string;
    pais: string;
    fechaInicio: string;
    expositor: string;
    tituloTrabajo: string;
    autor: string;
  
    constructor(id: number, reunion: string, pais: string, fechaInicio: string, expositor: string, tituloTrabajo: string, autor: string) {
      this.id = id;
      this.reunion = reunion;
      this.pais = pais;
      this.fechaInicio = fechaInicio;
      this.expositor = expositor;
      this.tituloTrabajo = tituloTrabajo;
      this.autor = autor;
    }
  }