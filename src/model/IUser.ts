import { Tipo } from "./EnumTipo";

export interface ILogin {
  usuario: string,
  senha: string
}

export interface IUserLogged {
  usuario: string;
  tipo: Tipo;
}

export interface IUserResponse {
  id: string
  usuario: string
  senha: string
  tipo: Tipo
}