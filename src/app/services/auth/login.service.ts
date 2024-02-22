import { Injectable } from '@angular/core';
import { LoginRequest } from '../../interfaces/LoginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, catchError, throwError, BehaviorSubject, tap} from 'rxjs';
import { Usuario } from '../../interfaces/Usuario';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // se agrega para la comunicacion entre componentes
  currentUserLoginOn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>({id:0, nombre:'', apellido:''});

  constructor(private http:HttpClient,private router:Router) { }
  
  //aca el login devuelve un observable al que esta subscripto
  //recibe como parametro un objeto de tipo loginRequest
  login(credenciales:LoginRequest):Observable<Usuario>{
    //aca va la ruta del endpoint del backend
    //return this.http.get<Usuario>('././assets/userData.json')
    return this.http.post<Usuario>("http://localhost:8080/usuario/login", credenciales).pipe (
      
      tap ((userData:Usuario) =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.manejadorErrores));
  }
  //manejar errores en el servicio
 private manejadorErrores(error:HttpErrorResponse){
    if(error.status===0){
      console.error(' Se ha producido un error', error.error)
    }
    else{
      console.error('El backend retorno el codigo de estado ', error.status, error.error)
    }
    return throwError(()=> new Error('Algo fallo, intente nuevamente'));
  }
  // se crean las propiedades para que los componentes se puedan subscribir
   get userData():Observable<Usuario>{
    return this.currentUserData.asObservable();
   }
   get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
   }
   
   // cerrar sesion
   logout(): void {
    
    this.currentUserData.next({ id: 0, nombre: '', apellido: '' });
    this.currentUserLoginOn.next(false);
    this.router.navigateByUrl('/inicio');
  //  this.router.navigateByUrl('/pagina-principal');
    //this.formularioLogin.reset();
  }
}
