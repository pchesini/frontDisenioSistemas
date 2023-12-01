import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy{ //
  usuarioLogeado:boolean = false;
  
  constructor( private router:Router, private loginService:LoginService){}ngOnDestroy(): void {
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
   
  }

  //
  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/inicio');
    
  }
}
