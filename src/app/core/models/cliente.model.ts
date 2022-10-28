export interface clienteInterface {
    _id: string,
    rut:  string,
    nombre: string,
    email:  string,
    telefono: string,
    transferencias: any[],
    cuentas: any[],
    saldo: number,
    contraseña:  string,
    bloqueado: false,
    avatar:  string,
    token:  string,
    createdAt:  Date,
    updatedAt: Date,
    __v: number
}