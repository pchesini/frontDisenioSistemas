import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RcInternacionalComponent } from '../rc-internacional/rc-internacional.component';
import { Rci } from '../rc-internacional/rci';

@Injectable({
  providedIn: 'root'
})
export class RciService {

  //acá va el endpoint
  private url:string="http://localhost:3000/rci"


  constructor(private http: HttpClient) { }

  //Obtener todas las reuniones cientificas internacionales (rci)
 getAllRci():Observable<Rci[]> {
    return this.http.get<Rci[]>(this.url);
  }

  //crear rci
  createRci(rci: Rci):Observable<Rci> {
    return this.http.post<Rci>(this.url, rci);
  }

  //Obtener un rci
  get(id:number):Observable<Rci> {
    return this.http.get<Rci>(this.url+'/'+id);
  }

  //actualizar rci
  actualizarRci(rci: Rci):Observable<Rci>{
    return this.http.put<Rci>(this.url, rci);
  }

  //eliminar rci
  eliminar(id:number):Observable<Rci> {
    return this.http.delete<Rci>(this.url+'/'+id);
  }

}
