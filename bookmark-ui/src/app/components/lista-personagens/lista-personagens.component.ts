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
        { nome: 'Emerson', descricao: 'melhor amigo de Jhon', idade: 39 },
        { nome: 'Gabriel', descricao: `Lorem ipsum dolor sit amet, 
                                        consectetur adipiscing elit. Ut sed libero erat.
                                        Aliquam pretium eros fringilla gravida laoreet.
                                        Aliquam vulputate dapibus ornare. 
                                        Ut tincidunt rutrum auctor. Nullam id felis justo.
                                        Proin et erat aliquet, faucibus erat nec, auctor mi.
                                        Proin venenatis scelerisque metus, eget scelerisque eros tincidunt at.`, idade: 29 }  
      ]

    });
  }

}
