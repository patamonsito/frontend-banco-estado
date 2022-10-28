import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Validador } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({});
  messageError: string = '';

  constructor(private authService: AuthService, private cookie: CookieService,
    private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        rut: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validador.validarRUT
        ]),
        contraseña: new FormControl('',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12)
          ])
      }
    )
  }

  sendLogin(): void {
    const { rut, contraseña } = this.formLogin.value
    let formatRut = rut.replaceAll('-', '').replaceAll('.', '').slice(0, -1) + '-' + rut.slice(-1);
    this.authService.sendCredentials(formatRut, contraseña)
      .subscribe(respuesta => { 
        if(!respuesta.isValid){
          return this.messageError = respuesta.mensaje
        }
        const { token } = respuesta
        this.cookie.set('token', token, 4, '/')
        this.router.navigate(['/', 'inicio'])
        
      },
        err => {
          this.messageError = err
        })

  }

  get rut() {
    return this.formLogin.get('rut');
  }

  get contrasenia() {
    return this.formLogin.get('contraseña');
  }

}
