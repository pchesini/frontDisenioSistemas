import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit, OnDestroy{

  userLoginOn:boolean = false;
  showList: string | null = null;
  //se agrego la funcionalidad de cerrar sesion pero no cambia el nombre por "salir"
  usuarioLogeado:boolean = false;// 
  userData?:Usuario;
  constructor(private loginService: LoginService) {
   
  }
  ngOnInit(): void {
   /* this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn=userLoginOn;
      
    })}*/
  
    
  }
  toggleList(listName: string): void {
    if (this.showList === listName) {
      this.showList = null; 
    } else {
      this.showList = listName;
    }
  }
  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
}
}

