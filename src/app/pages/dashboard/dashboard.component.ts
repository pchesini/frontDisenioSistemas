import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from  '../../interfaces/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoginOn:boolean = false;
  userData?:Usuario;
  constructor(private loginService: LoginService){}

  ngOnInit(): void{
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn=userLoginOn;
      }
    })
    this.loginService.currentUserData.subscribe({
      next:(userData) =>{
        this.userData=userData;
      }
    })
  }
  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }
;


}
