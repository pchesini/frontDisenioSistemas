import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rci } from '../rc-internacional/rci';

@Injectable({
  providedIn: 'root'
})
export class RciService {

  //acá va el endpoint: http://Reunión-científica/alta
  private url:string="http://localhost:3000/rci";


  constructor(private http: HttpClient) { }

  //Obtener todas las reuniones cientificas internacionales (rci)
  getAllRci(): Observable<Rci[]> {
    // Obtener todos los registros que no estén marcados como eliminados
    return this.http.get<Rci[]>(this.url);
  }

  //crear rci
  createRci(rci: Rci):Observable<Rci> {
    return this.http.post<Rci>(this.url, rci);
  }

  //Obtener un rci
  get(id:string):Observable<Rci> {
    return this.http.get<Rci>(this.url+'/'+id);
  }

  //actualizar rci
  actualizarRci(rci: Rci):Observable<Rci>{
    const url = `${this.url}/${rci.id}`; 
    return this.http.put<Rci>(url, rci);
  }

  //eliminar lógicamente un rci
  eliminar(id: string): Observable<Rci> {
    // En lugar de eliminar físicamente, actualizamos el registro marcándolo como eliminado
    return this.http.put<Rci>(`${this.url}/${id}`, { eliminado: true });
  }

  /*eliminar físicamente un rci
  eliminar(id:string):Observable<Rci> {
    return this.http.delete<Rci>(this.url+'/'+id);
  }*/


}
