import { AxiosResponse } from "axios";
import { IGetListUser, IGetParams, ILogin, IUserResponse, IUsuario } from "../model/IUser";
import { deleteR, get, post, put } from "./httpClient";
import { Usuario } from "../model/User";

export class Service {
  static async usuarioLogin(dados: ILogin ): Promise<AxiosResponse<IUserResponse[]>>{
    return await get("/login", {usuario: dados.usuario, senha: dados.senha })
  }

  static async getUsuarios(params: IGetParams): Promise<AxiosResponse<IGetListUser>> {
    return await get("/usuarios", {_page: params._page})
  }

  static async createUsuario(usuario: Usuario): Promise<AxiosResponse<Usuario | void>> {
    return post("/usuarios", usuario)
  }

  static async updateUsuario(id: string, dados: Usuario): Promise<AxiosResponse<Usuario | void> > {
    return await put(`/usuarios/${id}`, dados)
  }

  static async deleteUsuario(id: string): Promise<AxiosResponse<void>> {
    return await deleteR(`/usuarios/${id}`)
  }

  static async findUsuarioBy(field: string): Promise<AxiosResponse<IUsuario[]>>{
    return get("/usuarios", {field})
  }
}
