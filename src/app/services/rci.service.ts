import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RciComponent } from '../rci/rci.component';
import { RcInternacionalComponent } from '../rc-internacional/rc-internacional.component';

@Injectable({
  providedIn: 'root'
})
export class RciService {

  //acá va el endpoint
  private url:string=""


  constructor(private http: HttpClient) { }

  //Obtener todas las reuniones cientificas internacionales (rci)
 getAllRci():Observable<RciComponent[]> {
    return this.http.get<RciComponent[]>(this.url);
  }

  //crear rci
  createRci(rci: RciComponent):Observable<RciComponent> {
    return this.http.post<RciComponent>(this.url, rci);
  }

  //Obtener un rci
  get(id:number):Observable<RciComponent> {
    return this.http.get<RciComponent>(this.url+'/'+id);
  }

  //actualizar rci
  actualizarRci(rci: RciComponent):Observable<RciComponent>{
    return this.http.put<RciComponent>(this.url, rci);
  }

  //eliminar rci
  eliminar(id:number):Observable<RciComponent> {
    return this.http.delete<RciComponent>(this.url+'/'+id);
  }



}
