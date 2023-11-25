import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/services/auth/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  usuarioLogeado:boolean = false;
  userData?:Usuario;
  constructor(private loginService: LoginService){}
  
  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }
;

  ngOnInit(): void{
    this.loginService.currentUserLoginOn.subscribe({
      next:(usuarioLogeado) =>{
        this.usuarioLogeado=usuarioLogeado;
      }
    })
    this.loginService.currentUserData.subscribe({
      next:(userData) =>{
        this.userData=this.userData;
      }
    })
  }


}
