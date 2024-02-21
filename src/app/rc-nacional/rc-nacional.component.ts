import { Component } from '@angular/core';
import { Rcn } from './rcn';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RcnService } from '../services/rcn.service';

@Component({
  selector: 'app-rc-nacional',
  templateUrl: './rc-nacional.component.html',
  styleUrls: ['./rc-nacional.component.css']
})
export class RcNacionalComponent {
  rcnList: Rcn[] = []; //colección de rci
  rcn: Rcn = {
    reunion: '',
    ciudad: '',
    fechaInicio: '',
    expositor: '',
    tituloTrabajo: '',
    autor: ''
  };

  //formulario validaciones
  formRcn:FormGroup;

  constructor(private rcnService: RcnService, private fb: FormBuilder, private router: Router, private activated: ActivatedRoute){

    this.formRcn = this.fb.group({
      reunion: ['', [Validators.required]],
      ciudad:['', [Validators.required]],
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

    this.cargar();
  }

  loadRciData() {
    this.rcnService.getAllRcn().subscribe(
      rcnList => this.rcnList = rcnList
    );
  }

  onSubmit() {
    if (this.formRcn.valid) {

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
  
  //para cargar los datos seleccionados con el boton de editar
  cargar():void{
    this.activated.params.subscribe(
      e=>{
        let idString=e['id']; //acá está el id del enlace
       let id = parseInt(idString, 10);
        if(id){
          this.rcnService.get(id).subscribe(
            r=> this.rcn = r
          );
        }
        console.log("id: ", id, this.rcn);
      }
    )
  }
  

  ///eliminar una rci
delete(rci: Rcn): void {
  if (rci && rci.id) { // Comprobar si rci y rci.id están definidos y no son nulos
    console.log("deleted");
    this.rcnService.eliminar(rci.id).subscribe(
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
