import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      alert('Formulario enviado con éxito');
    } else {
      this.validateAllFormFields(this.contactForm);
      alert('Por favor, complete todos los campos antes de enviar el formulario');
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        if (control.invalid && control.errors) {
          const error = this.getErrorMessage(field, control.errors);
          alert(error);
        }
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  getErrorMessage(field: string, errors: any): string {
    if (errors.required) {
      return `${this.getFieldName(field)} es requerido.`;
    } else if (errors.email) {
      return `Correo electrónico no válido.`;
    } else if (errors.minlength) {
      return `El mensaje debe tener al menos ${errors.minlength.requiredLength} caracteres.`;
    }
    return '';
  }

  getFieldName(field: string): string {
    const fieldNames: { [key: string]: string } = {
      name: 'Nombre',
      email: 'Correo electrónico',
      message: 'Mensaje'
    };
    return fieldNames[field] || field;
  }

  get f() {
    return this.contactForm.controls;
  }
}

