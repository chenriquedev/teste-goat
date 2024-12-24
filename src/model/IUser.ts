import { Cargo, Tipo } from "./Enums";

export interface ILogin {
  usuario: string;
  senha: string;
}

export interface IUserLogged {
  usuario: string;
  tipo: Tipo;
}

export interface IUserResponse {
  id: string;
  usuario: string;
  senha: string;
  tipo: Tipo;
}

export interface IUsuario {
  id: string,
  nome: string;
  matricula: string;
  idade: number;
  cargo: Cargo;
  tipo: Tipo;
}

export interface IGetListUser {
  first: number | null;
  prev: number | null;
  next: number | null;
  last: number | null;
  pages: number;
  items: number;
  data: IUsuario[];
}

export interface IGetParams {
  _page: number;
}
