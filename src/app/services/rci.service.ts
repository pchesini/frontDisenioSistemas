import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rci } from '../rc-internacional/rci';

@Injectable({
  providedIn: 'root'
})
export class RciService {

  //acá va el endpoint
  private url:string="http://localhost:8080/Reunion-internacional";


  constructor(private http: HttpClient) { }

  //Obtener todas las reuniones cientificas internacionales (rci)
  getAllRci():Observable<Rci[]> {
    return this.http.get<Rci[]>(this.url+ '/lista');
  }
 

  //crear rci
  createRci(rci: Rci):Observable<Rci> {
    return this.http.post<Rci>(this.url+ '/alta', rci);
  }

  //Obtener un rci
  get(id:string):Observable<Rci> {
    return this.http.get<Rci>(this.url+'/'+ id);
  }

  //actualizar rci
  actualizarRci(rci: Rci):Observable<Rci>{
    const url = `${this.url}/${rci.id}`; 
    return this.http.put<Rci>(url, rci);
  }

  //eliminar rci
  eliminar(id:string):Observable<Rci> {
   // return this.http.delete<Rci>(this.url+'/baja'+id);
    return this.http.delete<Rci>(`${this.url}/baja/${id}`);
  }

  /*eliminar físicamente un rci
  eliminar(id:string):Observable<Rci> {
    return this.http.delete<Rci>(this.url+'/'+id);
  }*/


}
