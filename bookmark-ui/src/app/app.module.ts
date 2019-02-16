import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router'; 
import { TreeDiagram } from './components/tree-diagram';

import { AppComponent } from './app.component';
import { ListaLivrosComponent } from './components/lista-livros/lista-livros.component';
import { DetalheLivroComponent } from './components/lista-livros/detalhe-livro/detalhe-livro.component';
import { ListaPersonagensComponent } from './components/lista-personagens/lista-personagens.component';
import { DetalhePersonagemComponent } from './components/lista-personagens/detalhe-personagem/detalhe-personagem.component';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TreeChartPersonagensComponent } from './components/tree-chart-personagens/tree-chart-personagens.component';

const appRoutes :Route[] = [
  { path: 'home', redirectTo: '', pathMatch: 'prefix' },
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent }, 
  { path: 'livros', component: ListaLivrosComponent, children: [
    { path: ':livro', component: DetalheLivroComponent }    
    ]
  },
  { path: 'livro/:livro/personagens', component: ListaPersonagensComponent },  
  { path: 'livro/:livro/chart-personagens', component: TreeChartPersonagensComponent }  
]

@NgModule({ 
  declarations: [   
    AppComponent, 
    ListaLivrosComponent, 
    DetalheLivroComponent,  
    ListaPersonagensComponent,
    DetalhePersonagemComponent,
    HomeComponent, 
    SobreComponent,
    TreeChartPersonagensComponent
  ],
  imports: [  
    BrowserModule,
    TreeDiagram,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  
