import { LocalDateTime } from "@js-joda/core";

export class Rci {
    id?: string;
    reunion: string;
    pais: string;
    fechaInicio: LocalDateTime;
    expositor: string;
    tituloTrabajo: string;
    autor: string;
    eliminado: boolean;
  
    constructor(id: string, reunion: string, pais: string, fechaInicio: LocalDateTime, expositor: string, tituloTrabajo: string, autor: string, eliminado: boolean) {
      this.id = id;
      this.reunion = reunion;
      this.pais = pais;
      this.fechaInicio = fechaInicio;
      this.expositor = expositor;
      this.tituloTrabajo = tituloTrabajo;
      this.autor = autor;
      this.eliminado = eliminado;
    }
  }