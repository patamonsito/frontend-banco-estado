## Test Frontend Banco Estado

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 12.2.6 y Nodejs versión v12.22.12.

## Development server

Con "npm run server" se abrirá el servidor en localhost:4200.

## Consumo de API.

Para el correcto funcionamiento debe estar abierto el backend en puerto 3000.

## Inicio de Sesion

Rut: 11111111-1  
Contraseña: test123  
  
No ocupe copiar y pegar.  

## Módulos

* Login  
    -Válida Rut y Contraseña  
    -Obtiene el token de usuario y lo guarda en una cookie, también se ocupa para el consumo de las APIS.  
* Home  
    -Muestra el balance de la cuenta  
    -Muestra las últimas 5 transferencias realizadas  
* Transferir  
    -Selecciona destinatario.  
    -Crea destinatario y valida los campos.  
    -Al crear el destinatario si el rut es valido y es mayor a los 50 millones cambia el campo de "nombre y apellido" por "razón social".  
    -Consume la API de bancos destino “https://listadobancos.herokuapp.com/api/listado_banco”.  
    -Debe seleccionar un destinatario para poder ingresar un monto.  
    -Filtra los destinatarios por nombre, RUT, correo o teléfono (mínimo de 3 caracteres para realizar la búsqueda).  
    -No permite transferir menos de $1.000 y no más de $100.000.  
    -Mensaje, teléfono y correo son opcionales.  
* Cartola  
    -Muestra todas las transferencias realizadas.  
    -Filtra por Nombre, RUT y Correo (mínimo de 3 caracteres para realizar la búsqueda).  

## Framework utilizados

*Boostrap  
*Angular material  

## Test unitario con Jamine

Para ejecutar jasmine ocupé el comando "npm run test".  
