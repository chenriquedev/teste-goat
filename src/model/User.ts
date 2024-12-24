import { Cargo, Tipo } from "./Enums";

export class Usuario {
    constructor(
    private nome: string = '',
    private matricula: string = '',
    private idade: number = 0,
    private cargo: Cargo = Cargo.DesenvolvedorFrontend,
    private tipo: Tipo = Tipo.COMUM
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
    public setCargo(cargo: Cargo): void{
        this.cargo = cargo
    }
    public getTipo(): Tipo{
        return this.tipo
    }
    public setTipo(tipo: Tipo): void{
        this.tipo = tipo
    }
}

