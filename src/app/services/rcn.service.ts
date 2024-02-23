import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rcn } from '../rc-nacional/rcn';

@Injectable({
  providedIn: 'root'
})
export class RcnService {

  //acá va el endpoint
  private url:string="http://localhost:3000/rcn"


  constructor(private http: HttpClient) { }

  //Obtener todas las reuniones cientificas nacionales (rcn)
 getAllRcn():Observable<Rcn[]> {
    return this.http.get<Rcn[]>(this.url);
  }

  //crear rcn
  createRci(rci: Rcn):Observable<Rcn> {
    return this.http.post<Rcn>(this.url, Rcn);
  }

  //Obtener un rcn
  get(id:number):Observable<Rcn> {
    return this.http.get<Rcn>(this.url+'/'+id);
  }

  //actualizar rcn
  actualizarRcn(rcn: Rcn):Observable<Rcn>{
    return this.http.put<Rcn>(this.url, rcn);
  }

  //eliminar rcn
  eliminar(id:number):Observable<Rcn> {
    return this.http.delete<Rcn>(this.url+'/'+id);
  }
}
