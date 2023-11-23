import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ['p {color: red}'],
})
export class RegisterPageComponent {
  public formSubmitted = false;

  public resgisterForm: FormGroup = this.fb.group(
    {
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    },
    {
      Validators: this.passwordsIguales('password', 'password2')
    }
  );

  constructor(private fb: FormBuilder) {}

  crearUsuario() {
    this.formSubmitted = false;
    console.log(this.resgisterForm.value);

    if (this.resgisterForm.valid) {
      console.log('posteando formulario');
    } else {
      console.log('formulario no es correcto ..');
    }
  }

  campoNoValido(campo: string): boolean {

    if (this.resgisterForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.resgisterForm.get('password')?.value;
    const pass2 = this.resgisterForm.get('password')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({noEsIgual: true})
      }

    }
  }
}
