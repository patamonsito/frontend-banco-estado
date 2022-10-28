export interface destinatarioInterface {
    _id: string,
    rut: string,
    nombre: string,
    cuentas?: any[],
    email: string,
    telefono: string,
    clienteRef: string,
    createdAt:  Date,
    updatedAt: Date,
    __v: number
}