import { Component, OnInit } from '@angular/core';
import { Livro, Usuario } from 'src/app/models/bookmark.model';
import { LivroService } from 'src/app/services/livro.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private livroService: LivroService) { }

  livros: Livro[];
  livroSelecionado: Livro;
  usuario: Usuario;

  ngOnInit() {
  
    this.usuarioService.obterUsuario().subscribe((resp) => {
      this.usuario = resp;

      this.livroService.obterLivros(this.usuario)
         .subscribe((resp) => {
           this.livros = resp;

           if (this.livros === undefined)
             this.livros = [];
         });
    });
  }

  onExcluirLivro(livro: Livro) {
    this.livroService.removerLivro(this.usuario, livro)
       .subscribe((resp) => {
         this.livros = resp;
       });
  }

}
