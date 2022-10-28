export interface cuentaInterface {
    _id: string,
    banco: string,
    tipo: string,
    numero: number,
    saldo?: number,
    createdAt:  Date,
    updatedAt: Date,
    __v: number
}