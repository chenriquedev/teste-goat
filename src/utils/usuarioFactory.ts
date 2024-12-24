import { IUsuario } from "../model/IUser";
import { Usuario } from "../model/User";

export function usuarioFactory(usuario: IUsuario): Usuario{
  const newUsuario = new Usuario()
  newUsuario.setNome(usuario.nome)
  newUsuario.setCargo(usuario.cargo)
  newUsuario.setMatricula(usuario.matricula)
  newUsuario.setIdade(usuario.idade)
  newUsuario.setTipo(usuario.tipo)

  return newUsuario;
}