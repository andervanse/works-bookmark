import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Personagem } from 'src/app/models/bookmark.model';

@Component({
  selector: 'app-lista-personagens',
  templateUrl: './lista-personagens.component.html',
  styleUrls: ['./lista-personagens.component.css']
})
export class ListaPersonagensComponent implements OnInit {

  personagens :Personagem[];

  constructor(
    private route :ActivatedRoute, 
    private router :Router) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log(params['livro']);
      this.personagens = [ 
        { nome: 'Jhon', descricao: 'personagem principal do livro', idade: 32 },
        { nome: 'Marcia', descricao: 'par romântico de Jhon', idade: 27 },
        { nome: 'Emerson', descricao: 'melhor amigo de Jhon', idade: 39 }
      ]

    });
  }

}
