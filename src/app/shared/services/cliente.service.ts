import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly URL = environment.api

  constructor(private http: HttpClient) {

  }

  sendToken(token: string): Observable<any> {
    const body = {
      token
    }
    return this.http.post(`${this.URL}/auth/token`, body)
  }

  crearCuenta(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/cuentas/crear`, datos)
  }

  crearCliente(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/clientes/crear`, datos)
  }

  crearDestinatario(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/destinatarios/crear`, datos)
  }

  realizarTransferencia(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/transferencias/realizar`, datos)
  }

  obtenerDestinatarios(id: string): Observable<any> {
    return this.http.get(`${this.URL}/destinatarios/${id}`)
  }

  eliminarDestinatario(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/destinatarios/eliminar/${id}`)
  }

  obtenerBancos(): Observable<any> {
    return this.http.get(`https://listadobancos.herokuapp.com/api/listado_banco`)
  }


}
