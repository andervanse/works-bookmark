import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Livro, Usuario } from 'src/app/models/bookmark.model';
import { LivroService } from 'src/app/services/livro.service';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var componentHandler: any;

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
  imagemUpload: any;

  @ViewChild('livroForm') livroForm: FormGroup;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('saveModal') saveModal: ElementRef;

  ngAfterViewInit(){
    componentHandler.upgradeAllRegistered();
  }

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

  onAdicionarLivro() {
    this.livroSelecionado = null;
    this.dialog.nativeElement.showModal();
  }

  onSubmit(form) {

    if (form.valid) {

      let livro = new Livro();
      livro.id = form.value.id;
      livro.titulo = form.value.titulo;
      livro.descricao = form.value.descricao;
      this.updateImagemLivro(livro);
            
      this.livroService.salvarLivro(this.usuario, livro).subscribe((resp) => {
        this.livros = resp;
      });

      form.reset();
      this.imagemUpload = null;
    }

    this.dialog.nativeElement.close();
  }

  onExcluirLivro(livro: Livro) {

    this.livroService.removerLivro(this.usuario, livro)
       .subscribe((resp) => {
         this.livros = resp;
       });
  }

  onEditarLivro(livro: Livro) {    
    this.livroSelecionado = livro;
    this.livroForm.setValue({ id: livro.id, titulo:livro.titulo, descricao: livro.descricao });
    this.dialog.nativeElement.showModal();
  }

  private updateImagemLivro(livro: Livro) {

      if (this.livroSelecionado) {

        if (this.imagemUpload) {
          livro.imagemUrl = this.imagemUpload;
        } else {
          livro.imagemUrl = this.livroSelecionado.imagemUrl;
        }

      } else {

        if (this.imagemUpload) {
          livro.imagemUrl = this.imagemUpload;
        } else {
          livro.imagemUrl = '../../../assets/img/no-image.png';  
        }

      }    
  }

  imageUpload(e) {

    if (e.target.files[0]) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.imagemUpload = reader.result;
      }

      reader.readAsDataURL(file);
    }
  }

  onCloseModal() {
    this.livroForm.reset();
    this.dialog.nativeElement.close();
  }

}
