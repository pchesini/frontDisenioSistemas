import { Component } from '@angular/core';
import { Rcn } from './rcn';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RcnService } from '../services/rcn.service';
import { LocalDateTime } from '@js-joda/core';

@Component({
  selector: 'app-rc-nacional',
  templateUrl: './rc-nacional.component.html',
  styleUrls: ['./rc-nacional.component.css']
})
export class RcNacionalComponent {
  rcnList: Rcn[] = []; //colección de rci
  fechaActual = LocalDateTime.now();

  
  rcn: Rcn = {
    reunion: '',
    ciudad: '',
    fechaInicio: this.fechaActual,
    expositor: '',
    tituloTrabajo: '',
    autor: ''
  };

  editar: boolean = false;
  
  //formulario validaciones
  formRcn:FormGroup;

  constructor(private rcnService: RcnService, private fb: FormBuilder, private router: Router, private activated: ActivatedRoute){

    this.formRcn = this.fb.group({
      reunion: ['', [Validators.required]],
      ciudad:['', [Validators.required]],
      fechaInicio: [null, Validators.required],
      expositor: ['', [Validators.required]],
      tituloTrabajo: ['', [Validators.required]],
      autor: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.rcnService.getAllRcn().subscribe(
      rcn => this.rcnList = rcn
    );

    this.loadRciData(); //se cargan los datos sin tener que refrescar cuando se agrega una nueva rci

    
  }

  loadRciData() {
    this.rcnService.getAllRcn().subscribe(
      rcnList => this.rcnList = rcnList
    );
  }

  //carga del formulario
  onSubmit() {
    //si el id del rci existe se modifica:
    if (this.rcn.id){
        this.actualizar();
        console.log("Rcn modificado: ",this.rcn);
        
    }  else if (this.formRcn.valid) {

        // Guardar la información del formulario en la variable rci
        this.rcn = {
          reunion: this.formRcn.value.reunion,
          ciudad: this.formRcn.value.ciudad,
          fechaInicio: this.formRcn.value.fechaInicio,
          expositor: this.formRcn.value.expositor,
          tituloTrabajo: this.formRcn.value.tituloTrabajo,
          autor: this.formRcn.value.autor
  
        }
    
        // Lógica para manejar el envío del formulario aquí
        console.log(this.rcn);
        this.rcnService.createRci(this.rcn).subscribe(
          res=>{
            this.loadRciData(); // Vuelve a cargar los datos después de la creación exitosa
            this.router.navigate(['rcn']);
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
          this.rcnService.get(id).subscribe(
            r=> {
              this.rcn = r;
              // Asignar datos al formulario
              this.formRcn.patchValue({
                reunion: r.reunion,
                ciudad: r.ciudad,
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
    this.rcn = {
      id: this.rcn.id,
      reunion: this.formRcn.value.reunion,
      ciudad: this.formRcn.value.cidad,
      fechaInicio: this.formRcn.value.fechaInicio,
      expositor: this.formRcn.value.expositor,
      tituloTrabajo: this.formRcn.value.tituloTrabajo,
      autor: this.formRcn.value.autor
  };
    console.log(this.rcn);
    this.rcnService.actualizarRcn(this.rcn).subscribe(
      r=> this.router.navigate(['/rcn'])
    );
  }

  ///eliminar una rci
delete(rcn: Rcn): void {
  if (rcn && rcn.id) { // Comprobar si rci y rci.id están definidos y no son nulos
    console.log("deleted");
    this.rcnService.eliminar(rcn.id).subscribe(
      () => {
        // Después de eliminar la rci, actualiza la lista de rcn
        this.rcnService.getAllRcn().subscribe(
          (response: Rcn[]) => {
            this.rcnList = response; // Actualiza la lista de rcns
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
  } else {
    console.error("No se puede eliminar la rci porque no tiene un ID definido.");
  }
}
}
