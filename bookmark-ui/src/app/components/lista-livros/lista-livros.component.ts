import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/bookmark.model';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnInit {

  constructor() { }

  livros :Livro[];
  
  ngOnInit() {
    this.livros = [      
        { id:1, titulo:"A Metronome Killed", descricao: "", imagemUrl: "", personagens: [] },
        { id:2, titulo:"The Man of Name", descricao: "", imagemUrl: "", personagens: []},
        { id:3, titulo:"The Day Was Not Flapping", descricao: "", imagemUrl: "", personagens: []},
        { id:4, titulo:"The Next March", descricao: "", imagemUrl: "", personagens: []}
    ]
  }

  onSelectBook(livro) {
    console.log(livro);

  }

}
