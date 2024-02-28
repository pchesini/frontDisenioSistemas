import { Component, OnInit } from '@angular/core';
import { RciService } from '../services/rci.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rci } from './rci';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalDateTime } from '@js-joda/core';


@Component({
  selector: 'app-rc-internacional',
  templateUrl: './rc-internacional.component.html',
  styleUrls: ['./rc-internacional.component.css']
})
export class RcInternacionalComponent {

  abrirMensaje(): void{
    Swal.fire({
      title: "¿Confirma que desea guardar?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("¡Guardado con exito!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("No se guardaron los cambios", "", "info");
      }
    });
    }

    abrirMensaje2(): void{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Usted está seguro que desea eliminar la reunión?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Borrado!",
            text: "Su reunión fue borrada exitosamente",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La reunión no se borró",
            icon: "error"
          });
        }
      });
    }

/* para el mensaje del botón editar
    abrirMensaje3(): void{
      Swal.fire({
        title: "¿Desea confirmar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        
        if (result.isConfirmed) {
          Swal.fire("¡Guardado con exito!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("No se guardaron los cambios", "", "info");
        }
      });
      }*/

  rciList: Rci[] = []; //colección de rci
  fechaActual = LocalDateTime.now();
  
  rci: Rci = {
    reunion: '',
    pais: '',
    fechaInicio: this.fechaActual,
    expositor: '',
    tituloTrabajo: '',
    autor: '', 
    eliminado: false
  };

  editar: boolean = false;

  //formulario validaciones
  formRci:FormGroup;

  constructor(private rciService: RciService, private fb: FormBuilder, private router: Router, private activated: ActivatedRoute){

    this.formRci = this.fb.group({
      reunion: ['', [Validators.required]],
      pais:['', [Validators.required]],
      fechaInicio: [null, Validators.required],
      expositor: ['', [Validators.required]],
      tituloTrabajo: ['', [Validators.required]],
      autor: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.rciService.getAllRci().subscribe(
      rciList => {
        this.rciList = rciList;
      console.log(this.rciList)}
    )

  }

  //carga del formulario
  onSubmit() {
    if (this.rci.id) {
      // Si el ID de rci existe, se modifica
      this.actualizar();
    } else if (this.formRci.valid) {
      // Si el formulario es válido, se crea un nuevo rci
      this.rci = {
        reunion: this.formRci.value.reunion,
        pais: this.formRci.value.pais,
        fechaInicio: this.formRci.value.fechaInicio,
        expositor: this.formRci.value.expositor,
        tituloTrabajo: this.formRci.value.tituloTrabajo,
        autor: this.formRci.value.autor, 
        eliminado: false
      };
      
      console.log('Enviando nuevo rci:', this.rci);
      
      this.rciService.createRci(this.rci).subscribe(
        res => {
          console.log('Nuevo rci creado:', res);
          this.router.navigate(['rci']);
        },
        error => {
          console.error('Error al crear nuevo rci:', error);
        }
      );
    } else {
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
  cargar(): void {
    this.activated.params.subscribe(params => {
      let id = params?.['id'];
      console.log("id:", id);
      if (id) {
        this.editar = true;
        this.rciService.get(id).subscribe(
          r => {
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
          }
        );
      } else {
        // Si id no está definido, es una nueva reunión, establece editar en false y limpia el formulario
        this.editar = false;
        this.formRci.reset(); // Reinicia el formulario
      }
    });
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
      autor: this.formRci.value.autor,
      eliminado: false
  };
  
    this.rciService.actualizarRci(this.rci).subscribe(
      r=> this.router.navigate(['/rci'])
    );
  }

  //eliminado lógico de una rci
  delete(rci: Rci): void {
    if (!rci || !rci.id) {
      console.error("No se puede eliminar porque no se ha proporcionado un ID válido.");
      return;
    }
  
    console.log("Marcado como eliminado");
  
    // Realizamos una solicitud al servidor para marcar el objeto como eliminado
    this.rciService.eliminar(rci.id).subscribe(
      () => {
        console.log("Objeto marcado como eliminado en el servidor.");
        // Eliminamos el objeto de la lista en el frontend
        this.rciList = this.rciList.filter(item => item.id !== rci.id);
      },
      error => {
        console.error("Error al marcar como eliminado el objeto en el servidor:", error);
      }
    );
  }








  /*eliminado físico de una rci
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
  }*/


  
}
