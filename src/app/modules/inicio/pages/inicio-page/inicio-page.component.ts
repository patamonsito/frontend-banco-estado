import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from '@shared/services/cliente.service';
import { clienteInterface } from '@core/models/cliente.model';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit, OnDestroy {

  token: string = this.cookie.get('token') || '';
  public cliente: clienteInterface = 
    {
      "_id": "",
      "rut": "",
      "nombre": "",
      "email": "",
      "telefono": "",
      "transferencias": [],
      "cuentas": [],
      "saldo": 0,
      "contraseña": "",
      "bloqueado": false,
      "avatar": "",
      "token": "",
      "createdAt": new Date(),
      "updatedAt": new Date(),
      "__v": 0
  };

  constructor(private clienteService: ClienteService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(this.token){
      this.clienteService.sendToken(this.token)
      .subscribe(respuesta => {
        this.cliente = respuesta;
        this.cliente.transferencias = this.cliente.transferencias.filter((e, i) => {
          if(i < 5){
            return e;
          }
        })
      },
        err => {
          this.router.navigate(['/', 'auth'])
        })
    }else{
      this.router.navigate(['/', 'auth'])
    }
  }

  ngOnDestroy(): void {

  }

}
