import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rcn } from '../rc-nacional/rcn';

@Injectable({
  providedIn: 'root'
})
export class RcnService {

  //acá va el endpoint
  private url:string="http://localhost:8080/Reunion-nacional";


  constructor(private http: HttpClient) { }

  //Obtener todas las reuniones cientificas nacionales (rcn)
 getAllRcn():Observable<Rcn[]> {
    return this.http.get<Rcn[]>(this.url+ '/lista');
  }

  //crear rcn
  createRci(rcn: Rcn):Observable<Rcn> {
    return this.http.post<Rcn>(this.url + '/alta', rcn);
  }

  //Obtener un rcn
  get(id:string):Observable<Rcn> {
    return this.http.get<Rcn>(this.url+'/'+id);
  }

  //actualizar rcn
  actualizarRcn(rcn: Rcn):Observable<Rcn>{
    return this.http.put<Rcn>(this.url, rcn);
  }

  //eliminar rcn
  eliminar(id:string):Observable<Rcn> {
    //return this.http.delete<Rcn>(this.url+'/baja'+id);
    return this.http.delete<Rcn>(`${this.url}/baja/${id}`);
  }
}
