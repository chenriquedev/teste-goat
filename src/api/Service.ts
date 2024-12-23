import { AxiosResponse } from "axios";
import { ILogin, IUserResponse } from "../model/IUser";
import { get } from "./httpClient";

export class Service {
  static async usuarioLogin(dados: ILogin ): Promise<AxiosResponse<IUserResponse[]>>{
    return get("/login", {usuario: dados.usuario, senha: dados.senha })
  }

  static async getUsuarios() {
  }

  static async createUsuario(usuario: any) {
  }

  static async updateUsuario(id: string, dados: any) {
  }

  static async deleteUsuario(id: string) {
  }
}
