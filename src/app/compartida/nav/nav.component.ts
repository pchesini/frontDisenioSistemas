import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy{ //
  userLoginOn:boolean = false;
  loginSubscription: Subscription | undefined;
  router: Router | undefined;
  
  constructor( private loginService:LoginService, router:Router){}
  
  ngOnDestroy(): void {
   
    this.loginSubscription?.unsubscribe(); 
  }
;
 // aca me susbscribo al observable currentUserLoginOn
  ngOnInit(): void{
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) =>{
        this.userLoginOn=userLoginOn;
       }
    })
   
  }

  //
  logout(): void {
    this.loginService.logout();
   this.router?.navigateByUrl("/inicio")
    
  }
}
