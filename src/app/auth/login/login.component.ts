import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/interfaces/LoginRequest';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  // se crea un objeto formulario con las validaciones
  formularioLogin=this.formbuilder.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required,]]
  })
  // en el constructor se agrega el componente de rutas
  constructor(private formbuilder:FormBuilder, private router:Router, private loginService:LoginService){}
  ngOnInit(): void {
   /**/  this.formularioLogin = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  // funcion para rerornar el email para usar en las validaciones del formulario
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
          this.router.navigateByUrl('/pagina-principal');
          this.formularioLogin.reset();
        }
      });
      
    }
    else{
      this.formularioLogin.markAllAsTouched();
     alert("error al iniciar sesion");
    }

  }
}
