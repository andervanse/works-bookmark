export class Usuario {
    id: string;
    nome: string;
    livros?: Livro[];
}

export class Livro {
    id: string;
    usuario: Usuario;
    titulo: string;
    imagemUrl?: string;
    descricao?: string;
    personagens?: Personagem[];
}

export class Personagem {
    id: string;
    nome: string;
    idade: number;
    descricao: string;
    imagemUrl?: string;
    personagemPai?: Personagem;
    personagemsFilhos?: Personagem[];
}

export class PersonagemNode {
    displayName: string;
    children: string[];
    guid: string;
    parentId?: string;
    dataObject: any;
}

