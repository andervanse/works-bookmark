import { Injectable } from "@angular/core";
import { Livro, Personagem, Usuario } from "../models/bookmark.model";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from "util";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class LivroService {

    livros: Livro[];

    constructor(private http: HttpClient) { }

    obterLivros(usuario: Usuario): Observable<Livro[]> {

        return this.http.get<Livro[]>(`${environment.ApiBaseUrl}/assets/mock-data.json`)
            .pipe(
                map((res: Livro[]) => {
                    res.forEach(element => {
                        if (isNullOrUndefined(element.imagemUrl)) {
                            element.imagemUrl = './assets/img/no-image.png';
                        }
                    });
                    this.livros = res;
                    return res;
                })
            );
    }

    obterLivro(livroId: string): Observable<Livro> {

        return this.http.get<Livro>(`${environment.ApiBaseUrl}/assets/mock-data.json`)
            .pipe(
                map((resp: Livro[]) => {
                    resp.forEach(element => {
                        if (isNullOrUndefined(element.imagemUrl)) {
                            element.imagemUrl = './assets/img/no-image.png';
                        }
                    });                    
                    this.livros = resp;  
                    let l = resp.find((l) => { return l.id == livroId });
                    return l;
                })
            );
    }

    salvarLivro(usuario: Usuario, livro: Livro): Observable<Livro[]> {

        if (isNullOrUndefined(livro.id) || livro.id === '') {
            livro.id = this.uuidv4();
            this.livros.push(livro);
        } else {
            let idx = this.livros.findIndex((l) => l.id === livro.id);
            this.livros[idx] = livro;
        }

        return of(this.livros);
    }

    removerLivro(usuario: Usuario, livro: Livro): Observable<Livro[]> {

        this.livros = this.livros.filter((l) => {
            return l.id !== livro.id;
        });

        return of(this.livros);
    }

    adicionarPersonagem(livro: Livro, personagem: Personagem): Observable<boolean> {
        livro.personagens.push(personagem);
        return of(true);
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}