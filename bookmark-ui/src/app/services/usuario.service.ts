import { Observable, of } from "rxjs";
import { Usuario } from "../models/bookmark.model";
import { Injectable } from "@angular/core";


@Injectable()
export class UsuarioService {

    obterUsuario(): Observable<Usuario> {

        let usr = new Usuario();
        usr.id = '0001';
        usr.nome = 'Usuário Teste';
        usr.livros = [];

        return of(usr);
    }
}
