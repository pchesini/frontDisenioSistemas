import { Injectable } from '@angular/core';
import { LoginRequest } from './LoginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, catchError, throwError, BehaviorSubject, tap} from 'rxjs';
import { Usuario } from './Usuario';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({id:0, nombre:'', apellido:''});

  constructor(private http:HttpClient) { }
  
  //aca el login devuelve un observable al que esta subscripcto
  login(credenciales:LoginRequest):Observable<Usuario>{
    //aca va la ruta del endpoint del backend
    return this.http.get<Usuario>('././assets/userData.json').pipe (
      //deberia ser userData: Usuario pero da error
      tap ((userData:Usuario) =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.manejadorErrores));
  }
  //manejar errores
 private manejadorErrores(error:HttpErrorResponse){
    if(error.status===0){
      console.error(' Se ha producido un error', error.error)
    }
    else{
      console.error('El backend retorno el codigo de estado ', error.status, error.error)
    }
    return throwError(()=> new Error('Algo fallo, intente nuevamente'));
  }
   get userData():Observable<Usuario>{
    return this.currentUserData.asObservable();
   }
   get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
   }
}
