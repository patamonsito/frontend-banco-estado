import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClienteService } from '@shared/services/cliente.service';
import { clienteInterface } from '@core/models/cliente.model';
import { cuentaInterface } from '@core/models/cuenta.model';
import { destinatarioInterface } from '@core/models/destinatario.model';
import { Validador } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-transferir-page',
  templateUrl: './transferir-page.component.html',
  styleUrls: ['./transferir-page.component.css']
})
export class TransferirPageComponent implements OnInit, OnDestroy {

  token: string = this.cookie.get('token') || '';

  nuevoDestinatario: boolean = false;

  bancos: any = []

  destinatarioSeleccionado: any = null

  cuentaSeleccionada: any = {}

  creandoDestinatario: boolean = false;

  isPersona: boolean = true;

  cliente: clienteInterface =  {
      _id: "",
      rut: "",
      nombre: "",
      email: "",
      telefono: "",
      transferencias: [],
      cuentas: [],
      saldo: 0,
      contraseña: "",
      bloqueado: false,
      avatar: "",
      token: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
  };

  cuenta: cuentaInterface = {
    _id: "",
    banco: "",
    tipo: "",
    numero: 0,
    createdAt:  new Date(),
    updatedAt: new Date(),
    __v: 0

  }

  tipos: any[] = [{
    descripcion: 'Cuenta Corriente'
  },{
    descripcion: 'Cuenta Vista'
  },{
    descripcion: 'Cuenta Rut'
  },{
    descripcion: 'Cuenta Ahorro'
  }]


  formDestinatario: FormGroup = new FormGroup({});

  destinatario: destinatarioInterface = {
    _id: "",
    rut: "",
    nombre: "",
    cuentas: [],
    email: "",
    telefono: "",
    clienteRef: "",
    createdAt:  new Date(),
    updatedAt: new Date(),
    __v: 0
  }

  saveDestinatarios: Array<destinatarioInterface> = [ {
    _id: "",
    rut: "",
    nombre: "",
    email: "",
    telefono: "",
    clienteRef: "",
    createdAt:  new Date(),
    updatedAt: new Date(),
    __v: 0
  } ]


  destinatarios: Array<destinatarioInterface> = [ {
    _id: "",
    rut: "",
    nombre: "",
    email: "",
    telefono: "",
    clienteRef: "",
    createdAt:  new Date(),
    updatedAt: new Date(),
    __v: 0
  } ]

  formTransaccion: FormGroup = new FormGroup({});

  constructor(private clienteService: ClienteService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formDestinatario = new FormGroup({
        rut: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(12),
          Validador.validarRUT
        ]),
        nombre: new FormControl('', [
          Validators.required,
          Validators.maxLength(50)
        ]),
        email: new FormControl('', [
          Validators.email,
          Validators.maxLength(50)
        ]),
        telefono: new FormControl('', [
          Validators.maxLength(10)
        ]),
        banco: new FormControl('', [
          Validators.required
        ]),
        tipo: new FormControl('', [
          Validators.required
        ]),
        numero: new FormControl('', [
          Validators.required,
          Validators.maxLength(16)
        ])
      })

      this.formTransaccion = new FormGroup({
        monto: new FormControl('', [
          Validators.required,
          Validators.min(1000), 
          Validators.max(100000)
        ]),
        mensaje: new FormControl('', [
          Validators.maxLength(100)
        ])
      })

      this.clienteService.obtenerBancos()
      .subscribe(respuesta => {
        this.bancos = respuesta.Banco;
      },
        err => {
          console.log(err)
      })

    if(this.token){
      this.clienteService.sendToken(this.token)
      .subscribe(respuesta => {
        this.cliente = respuesta;

        this.getDestinatarios();
      },
        err => {
          this.router.navigate(['/', 'auth'])
        })
    }else{
      this.router.navigate(['/', 'auth'])
    }
  }



  filterDestinatario(e: any){

    let value = e.target.value ? e.target.value.length < 3 ? null : e.target.value.toLowerCase() : null;
    
    if(value){
    this.destinatarios = this.saveDestinatarios;
    let filtroDestinatarios = this.destinatarios.filter((e: any) =>  {
        let nombre = e.nombre.toLowerCase();
        let rut = e.rut.toLowerCase();
        let telefono = e.telefono;
        let email = e.email.toLowerCase();

        if(nombre.includes(value) || rut.includes(value) || telefono.includes(value) || email.includes(value)){
            return e;
        }
    });

    this.destinatarios = filtroDestinatarios;

  }else{
    this.destinatarios = this.saveDestinatarios;
    return;
  }


  }

  sendDestinatario(): void {

    const datos = [{
      ...this.formDestinatario.value,
      clienteRef: this.cliente._id
    }]  

    datos.map(e => {
      e.rut = e.rut.replaceAll('-', '').replaceAll('.', '').slice(0, -1) + '-' + e.rut.slice(-1);
      return e;
    }) 
    
    this.creandoDestinatario = true;

    this.clienteService.crearDestinatario(datos[0])
      .subscribe(respuesta => {

        this.getDestinatarios();

        this.creandoDestinatario = false;
        this.nuevoDestinatario = false;
      },
        err => {
          console.log(err);
        })

  }

  getDestinatarios(){
    this.clienteService.obtenerDestinatarios(this.cliente._id)
    .subscribe(respuesta => {
      this.destinatarios = respuesta;
      this.saveDestinatarios = respuesta;
    },
      err => {
        console.log(err)
    })

  }

  seleccionarDestinatario(cuenta: any, destinatario: any){
    this.destinatarioSeleccionado = destinatario;
    this.cuentaSeleccionada = cuenta;
  }

  verificarRut(){
    const rutDestinatario = this.formDestinatario.value.rut;

    if(this.rut?.status != "INVALID" && rutDestinatario.length == 12){
      const formatRut = rutDestinatario.replaceAll('-', '').replaceAll('.', '').slice(0, -1) + '-' + rutDestinatario.slice(-1);

      if(Number(formatRut.slice(0,2)) > 49){
        this.isPersona = false;
      }
    }else{
      this.isPersona = true;
    }

  }


  sendTransaccion(): void{

    let datos = {
      id: this.cliente._id,
      rut: this.destinatarioSeleccionado.rut,
      nombre: this.destinatarioSeleccionado.nombre,
      cuenta: this.cliente.cuentas[0]._id,
      bancoDestino: this.cuentaSeleccionada.banco,
      tipoCuentaDestino: this.cuentaSeleccionada.tipo,
      numeroCuentaDestino: this.cuentaSeleccionada.numero,
      email: this.destinatarioSeleccionado.email,
      telefono: this.destinatarioSeleccionado.telefono,
      monto: this.formTransaccion.value.monto,
      mensaje: this.formTransaccion.value.mensaje
    }

    this.clienteService.realizarTransferencia(datos)
      .subscribe(respuesta => {
        this.router.navigate(['/', 'cartola'])
      },
        err => {
          console.log(err);
        })


  }

  eliminarDestinatario(id: string){
    this.clienteService.eliminarDestinatario(id)
      .subscribe(respuesta => {
        this.getDestinatarios();
      },
        err => {
          console.log(err);
        })
  }


  
  get rut() {
    return this.formDestinatario.get('rut');
  }
  get nombre() {
    return this.formDestinatario.get('nombre');
  }
  get banco() {
    return this.formDestinatario.get('banco');
  }
  get tipo() {
    return this.formDestinatario.get('tipo');
  }
  get numero() {
    return this.formDestinatario.get('numero');
  }
  get monto() {
    return this.formTransaccion.get('monto');
  }

  ngOnDestroy(): void {

  }

}
