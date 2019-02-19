import { Component, OnInit, ViewChild } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Livro, Usuario } from 'src/app/models/bookmark.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

declare var componentHandler: any;

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html',
  styleUrls: ['./editar-livro.component.css']
})
export class EditarLivroComponent implements OnInit {

  usuario: Usuario;
  imagemUpload: any;
  livro: Livro;
  titulo: string;
  @ViewChild('livroForm') livroForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private livroService: LivroService) { }

    ngAfterViewInit(){
          componentHandler.upgradeAllRegistered();
    }

  ngOnInit() {
    this.route.params.subscribe((params) => {

      const livroId = params['livro'];

      if (livroId !== '0') {
        this.titulo = "Editar Livro";
        this.livroService.obterLivro(livroId).subscribe((resp) => {
          this.livro = resp;
          this.livroForm.setValue({
            id: this.livro.id,
            titulo: this.livro.titulo,
            descricao: this.livro.descricao
          });

        });
      } else {
        this.titulo = "Novo Livro";
      }
    });
  }

  onSubmit(form) {

    if (form.valid) {

      let livro = new Livro();
      livro.id = form.value.id;
      livro.titulo = form.value.titulo;
      livro.descricao = form.value.descricao;
      this.updateImagemLivro(livro);

      this.livroService.salvarLivro(this.usuario, livro).subscribe((resp) => {
        this.router.navigate(['./livros']);
      });

      form.reset();
      this.imagemUpload = null;
    }

  }

  private updateImagemLivro(livro: Livro) {

    if (this.imagemUpload) {
      livro.imagemUrl = this.imagemUpload;
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

}
