import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/LoginRequest';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  formularioLogin=this.formbuilder.group({
    email:['pablo@mail',[Validators.required, Validators.email]],
    password:['1234',[Validators.required]]
  })
  constructor(private formbuilder:FormBuilder, private router:Router, private loginService:LoginService){}
  ngOnInit(): void {
      
  }
  // funcion para terornar el email para usar en las validaciones del formulario
   get email(){
    return this.formularioLogin.controls.email;
   }
   get password(){
    return this.formularioLogin.controls.password;
   }

   // aca el login se suscribe al loginService que es el obervable(actualiza los cambios que vienen del back)
  login(){
    if(this.formularioLogin.valid){
      this.loginService.login(this.formularioLogin.value as LoginRequest).subscribe({
        next : (datosUsuario) =>{
          console.log(datosUsuario);
        },
        error: (errorDatos) =>{
          console.log(errorDatos)
          this.loginError=errorDatos;
        },
        complete: ()=>{
          console.log("login Completo");
         // aca deberia ir la ruta de inicio
          this.router.navigateByUrl('/inicio');
          this.formularioLogin.reset();
        }
      });
      
    }
    else{
      this.formularioLogin.markAllAsTouched();
     alert("error al iniaciar sesion");
    }

  }
}
