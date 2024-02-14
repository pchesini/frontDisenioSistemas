import { Component } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
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
        this.userData=userData;
      }
    })
  }
}
