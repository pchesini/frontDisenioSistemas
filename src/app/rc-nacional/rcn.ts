import { LocalDateTime } from "@js-joda/core";

export class Rcn {
    id?: string;
    reunion: string;
    ciudad: string;
    fechaInicio: LocalDateTime;
    expositor: string;
    tituloTrabajo: string;
    autor: string;
  
    constructor(id: string, reunion: string, ciudad: string, fechaInicio: LocalDateTime, expositor: string, tituloTrabajo: string, autor: string) {
      this.id = id;
      this.reunion = reunion;
      this.ciudad = ciudad;
      this.fechaInicio = fechaInicio;
      this.expositor = expositor;
      this.tituloTrabajo = tituloTrabajo;
      this.autor = autor;
    }
  }