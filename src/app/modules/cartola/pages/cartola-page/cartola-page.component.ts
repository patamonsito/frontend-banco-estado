import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from '@shared/services/cliente.service';
import { clienteInterface } from '@core/models/cliente.model';

@Component({
  selector: 'app-cartola-page',
  templateUrl: './cartola-page.component.html',
  styleUrls: ['./cartola-page.component.css']
})
export class CartolaPageComponent implements OnInit, OnDestroy {

  transferencias: any[] = [];
  saveTransferencias: any[] = [];
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
        this.transferencias = this.cliente.transferencias;
        this.saveTransferencias = this.cliente.transferencias;
      },
        err => {
          this.router.navigate(['/', 'auth'])
        })
    }else{
      this.router.navigate(['/', 'auth'])
    }
  }

  filterTransferencias(e: any){

    let value = e.target.value ? e.target.value.length < 3 ? null : e.target.value.toLowerCase() : null;
    
    if(value){
    this.transferencias = this.saveTransferencias;
    let filtroTransferencias = this.transferencias.filter((e: any) =>  {
        let nombre = e.nombre.toLowerCase();
        let rut = e.rut.toLowerCase();
        let email = e.email.toLowerCase();

        if(nombre.includes(value) || rut.includes(value) || email.includes(value)){
            return e;
        }
    });

    this.transferencias = filtroTransferencias;

  }else{
    this.transferencias = this.saveTransferencias;
    return;
  }


  }



  ngOnDestroy(): void {

  }

}
