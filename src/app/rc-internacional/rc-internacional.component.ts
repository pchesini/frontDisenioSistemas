import { Component, OnInit } from '@angular/core';
import { RciService } from '../services/rci.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rci } from './rci';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-rc-internacional',
  templateUrl: './rc-internacional.component.html',
  styleUrls: ['./rc-internacional.component.css']
})
export class RcInternacionalComponent {

  rciList: Rci[] = []; //colección de rci
  
  rci: Rci = {
    reunion: '',
    pais: '',
    fechaInicio: '',
    expositor: '',
    tituloTrabajo: '',
    autor: ''
  };

  editar: boolean = false;

  //formulario validaciones
  formRci:FormGroup;

  
  constructor(private rciService: RciService, private fb: FormBuilder, private router: Router, private activated: ActivatedRoute){

    this.formRci = this.fb.group({
      reunion: ['', [Validators.required]],
      pais:['', [Validators.required]],
      expositor: ['', [Validators.required]],
      tituloTrabajo: ['', [Validators.required]],
      autor: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.rciService.getAllRci().subscribe(
      rci => this.rciList = rci
    );
    
    this.loadRciData(); //se cargan los datos sin tener que refrescar cuando se agrega una nueva rci
  }

  loadRciData() {
    this.rciService.getAllRci().subscribe(
      rciList => this.rciList = rciList
    );
  }

  //carga del formulario
  onSubmit() {
    //si el id del rci existe se modifica:
    if (this.rci.id){
        this.actualizar();
        console.log("Rci modificado: ",this.rci);
        
    }  else if (this.formRci.valid) {

        // Guardar la información del formulario en la variable rci
        this.rci = {
          reunion: this.formRci.value.reunion,
          pais: this.formRci.value.pais,
          fechaInicio: this.formRci.value.fechaInicio,
          expositor: this.formRci.value.expositor,
          tituloTrabajo: this.formRci.value.tituloTrabajo,
          autor: this.formRci.value.autor
  
        }
    
        // Lógica para manejar el envío del formulario aquí
        console.log(this.rci);
        this.rciService.createRci(this.rci).subscribe(
          res=>{
            this.loadRciData(); // Vuelve a cargar los datos después de la creación exitosa
            this.router.navigate(['rci']);
          }
        );
      } else {
        // Lógica para manejar un formulario no válido aquí
        console.log('El formulario no es válido, no se puede enviar.');
      }
  }
  
  //dispara el modo de edición en el modal
  setEditar(valor: boolean): void {
    this.editar = valor;
    if (valor) {
      this.cargar();
    }
  }

  //para cargar los datos seleccionados con el boton de editar
  cargar():void{
    this.activated.params.subscribe(
      param=>{
        let id= param?.['id']; //acá está el id del enlace
       console.log("id:", id);
        if(id){
          //this.editar = true; // Establecer editar en true si se proporciona un id
          this.rciService.get(id).subscribe(
            r=> {
              this.rci = r;
              // Asignar datos al formulario
              this.formRci.patchValue({
                reunion: r.reunion,
                pais: r.pais,
                fechaInicio: r.fechaInicio,
                expositor: r.expositor,
                tituloTrabajo: r.tituloTrabajo,
                autor: r.autor
              });
              console.log("datos cargados:",r);
            }
          );
        }
      }
    )
  }
  
  actualizar():void {
    // Asignar los nuevos valores del formulario a this.rci
    this.rci = {
      id: this.rci.id,
      reunion: this.formRci.value.reunion,
      pais: this.formRci.value.pais,
      fechaInicio: this.formRci.value.fechaInicio,
      expositor: this.formRci.value.expositor,
      tituloTrabajo: this.formRci.value.tituloTrabajo,
      autor: this.formRci.value.autor
  };
  
    this.rciService.actualizarRci(this.rci).subscribe(
      r=> this.router.navigate(['/rci'])
    );
  }

  ///eliminar una rci
  delete(rci: Rci): void {
    if (rci && rci.id) { // Comprobar si rci y rci.id están definidos y no son nulos
      console.log("deleted");
      this.rciService.eliminar(rci.id).subscribe(
        () => {
          // Después de eliminar la rci, actualiza la lista de rci
          this.rciService.getAllRci().subscribe(
            (response: Rci[]) => {
              this.rciList = response; // Actualiza la lista de rcis
            },
            (error) => {
              console.error("Error al obtener la lista de rcis después de eliminar:", error);
            }
          );
        },
        (error) => {
          console.error("Error al eliminar la rci:", error);
        }
      );
    }   else  {
      console.error("No se puede eliminar la rci porque no tiene un ID definido.");
    }
  }

}
