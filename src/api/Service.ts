import { AxiosResponse } from "axios";
import { IGetListUser, IGetParams, ILogin, IUserResponse, IUsuario } from "../model/IUser";
import { deleteR, get, put } from "./httpClient";
import { Usuario } from "../model/User";

export class Service {
  static async usuarioLogin(dados: ILogin ): Promise<AxiosResponse<IUserResponse[]>>{
    return await get("/login", {usuario: dados.usuario, senha: dados.senha })
  }

  static async getUsuarios(params: IGetParams): Promise<AxiosResponse<IGetListUser>> {
    return await get("/usuarios", {_page: params._page})
  }

  static async createUsuario(usuario: any) {
  }

  static async updateUsuario(id: string, dados: Usuario): Promise<AxiosResponse<Usuario | void> > {
    return await put(`/usuarios/${id}`, dados)
  }

  static async deleteUsuario(id: string) {
    return await deleteR(`/usuarios/${id}`)
  }
}
