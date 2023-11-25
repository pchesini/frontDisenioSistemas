import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{ //
  usuarioLogeado:boolean = false;
  constructor(private loginService:LoginService){};

  ngOnInit(): void{
    this.loginService.currentUserLoginOn.subscribe({
      next:(usuarioLogeado) =>{
        this.usuarioLogeado=usuarioLogeado;
       }
    })
   
  }
}
