import { Component,Renderer2, ElementRef } from '@angular/core';


@Component({
  selector: 'app-nueva-rn',
  templateUrl: './nueva-rn.component.html',
  styleUrls: ['./nueva-rn.component.css']
})
export class NuevaRnComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  addAuthorField() {
    const additionalAuthorsContainer = this.el.nativeElement.querySelector('.additional-authors');
    if (additionalAuthorsContainer) {
      const newAuthorInput = this.renderer.createElement('input');
      this.renderer.setAttribute(newAuthorInput, 'type', 'text');
      this.renderer.setAttribute(newAuthorInput, 'name', `author${additionalAuthorsContainer.childElementCount + 2}`);
      this.renderer.setAttribute(newAuthorInput, 'placeholder', `Autor ${additionalAuthorsContainer.childElementCount + 2}`);
      this.renderer.appendChild(additionalAuthorsContainer, newAuthorInput);
    }
  }

  removeAuthorField() {
    const additionalAuthorsContainer = this.el.nativeElement.querySelector('#authorsContainer');
    if (additionalAuthorsContainer && additionalAuthorsContainer.childElementCount > 1) {
      this.renderer.removeChild(additionalAuthorsContainer, additionalAuthorsContainer.lastElementChild);
    }
  }

  cancelForm() {
    alert('Formulario cancelado');
    // Puedes agregar aquí cualquier acción adicional que desees realizar al cancelar el formulario
  }

  handleSubmit() {
    // Puedes agregar aquí la lógica para enviar el formulario

    // Muestra el mensaje de éxito
    const successMessage = this.el.nativeElement.querySelector('#Reunion Cientifica Nacional agregada exitosamente');
    if (successMessage) {
      this.renderer.setStyle(successMessage, 'display', 'block');
    }

    // Devuelve false para evitar que el formulario se envíe realmente (porque no tenemos una acción de formulario real)
    return false;
  }
  }
  
  
  
