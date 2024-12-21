import { Tipo } from "./EnumTipo";

export class Usuario {
    constructor(
    private nome: string,
    private matricula: string,
    private idade: number,
    private cargo: string,
    private tipo: Tipo
    ){}

    public getNome(): string{
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome
    }

    public getMatricula(): string {
        return this.matricula
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula
    }

    public getIdade(): number{
        return this.idade
    }
    public setIdade(idade:number): void{
        this.idade = idade
    }
    public getCargo(): string {
        return this.cargo
    }
    public setCargo(cargo: string): void{
        this.cargo = cargo
    }
    public getTipo(): Tipo{
        return this.tipo
    }
    public setTipo(tipo: Tipo): void{
        this.tipo = tipo
    }
}

