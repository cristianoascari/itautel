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

// Enumerator for plans list.
export enum EPlan {
  P30 = 'P30',
  P60 = 'P60',
  P120 = 'P120'
}
