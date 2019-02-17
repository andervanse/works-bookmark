import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivroService } from 'src/app/services/livro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Personagem, PersonagemNode, Livro } from 'src/app/models/bookmark.model';
import { NodesListService } from '../tree-diagram/services/nodesList.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tree-chart-personagens',
  templateUrl: './tree-chart-personagens.component.html',
  styleUrls: ['./tree-chart-personagens.component.css']
})
export class TreeChartPersonagensComponent implements OnInit {

  dataset: {};
  livroSelecionado: Livro;
  descricaoPersonagem: string;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private nodelstService: NodesListService,
    private livroService: LivroService) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      let livroId = params['livro'];

      this.livroService.obterLivro(livroId)
        .subscribe((resp) => {          
          this.livroSelecionado = resp;

          if (!isNullOrUndefined(this.livroSelecionado)) {
            let nodes = this.converterPersonagensParaNode(this.livroSelecionado.personagens);

            this.dataset = {
              json: nodes,
              config: {
                nodeWidth: 100,
                nodeHeight: 70
              }
            }
          }
        });

    });
  }

  converterPersonagensParaNode(personagens: Personagem[]): any[] {
    let personagemList: PersonagemNode[] = [];

    if (!isNullOrUndefined(personagens)) {

      for (let i = 0; i < personagens.length; i++) {
        personagemList.push({
          displayName: personagens[i].nome,
          children: (personagens[i].personagemsFilhos ? personagens[i].personagemsFilhos.map(x => x.id) : null),
          guid: personagens[i].id,
          parentId: (personagens[i].personagemPai ? personagens[i].personagemPai.id : null),
          dataObject: personagens[i].descricao
        });
      }

    }
    return personagemList;
  }

  onNodeSelected(dataObject) {
    this.descricaoPersonagem = dataObject;
  }
}
