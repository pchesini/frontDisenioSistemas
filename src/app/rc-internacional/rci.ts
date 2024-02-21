export class Rci {
    id?: string;
    reunion: string;
    pais: string;
    fechaInicio: string;
    expositor: string;
    tituloTrabajo: string;
    autor: string;
  
    constructor(id: string, reunion: string, pais: string, fechaInicio: string, expositor: string, tituloTrabajo: string, autor: string) {
      this.id = id;
      this.reunion = reunion;
      this.pais = pais;
      this.fechaInicio = fechaInicio;
      this.expositor = expositor;
      this.tituloTrabajo = tituloTrabajo;
      this.autor = autor;
    }
  }