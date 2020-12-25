// Interface for requests model.
export interface IRequest {
  _id?: string;
  cnpj: string;
  data: Date;
  empresa: string;
  minutos: number;
  plano: string;
  tarifa: string;
  valor: string;
}
