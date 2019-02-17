import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TreeDiagram } from './components/tree-diagram';
import { AppComponent } from './app.component';
import { ListaLivrosComponent } from './components/lista-livros/lista-livros.component';
import { ListaPersonagensComponent } from './components/lista-personagens/lista-personagens.component';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TreeChartPersonagensComponent } from './components/tree-chart-personagens/tree-chart-personagens.component';
import { LivroService } from './services/livro.service';
import { UsuarioService } from './services/usuario.service';
import { EditarLivroComponent } from './components/editar-livro/editar-livro.component';

const appRoutes :Route[] = [
  { path: 'home', redirectTo: '', pathMatch: 'prefix' },
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent }, 
  { path: 'livros', component: ListaLivrosComponent },
  { path: 'livro/:livro/personagens', component: ListaPersonagensComponent },  
  { path: 'livro/:livro/chart-personagens', component: TreeChartPersonagensComponent },
  { path: 'editar-livro/:livro', component: EditarLivroComponent }  
]

@NgModule({ 
  declarations: [   
    AppComponent, 
    ListaLivrosComponent, 
    ListaPersonagensComponent,
    HomeComponent, 
    SobreComponent,
    TreeChartPersonagensComponent,
    EditarLivroComponent
  ],
  imports: [  
    BrowserModule,
    FormsModule,
    TreeDiagram,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [UsuarioService, LivroService],
  bootstrap: [AppComponent]
})
export class AppModule { }  
