

export class Livro {
    id:number;
    titulo:string;
    imagemUrl:string;
    descricao:string;
    personagens:Personagem[];
}

export class Personagem {
    nome:string;
    idade:number;
    descricao:string;
}