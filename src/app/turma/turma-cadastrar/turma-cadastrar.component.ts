import { ResponseTurma } from './../shared/responseTurma.model';
import { TurmaService } from './../shared/turma.service';
import { CursoService } from './../shared/curso.service';
import { Curso } from './../shared/curso.model';
import { Turma } from '../shared/turma.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CursosResponse } from '../shared/cursoResponse';

declare var $: any;

@Component({
  selector: 'app-turma-cadastrar',
  templateUrl: './turma-cadastrar.component.html',
  styleUrls: ['./turma-cadastrar.component.css']
})
export class TurmaCadastrarComponent implements OnInit {

  @ViewChild('formDisciplina', {static: true}) formDisciplina: NgForm;

  requestSucess = false;
  mensagemModal = '';
  titleModal = '';
  cadastrando = false;

  btnCadastrar = false;

  responseTurma: ResponseTurma;
  responseCursos: CursosResponse;

  curso: Curso = {
    cdCurso: null,
    nmCurso: null,
    qtHora: null
  };

  turma: Turma = {
    cdCodigo: null,
    nmTurma: null,
    curso: this.curso,
    dsPeriodo: null,
    stTurma: true
  };

  listCurso: Array<Curso>;

  constructor(private service: TurmaService,
  private cursoService: CursoService) {

  }

  ngOnInit(): void {
    this.cursoService.getListarCursos().subscribe(
      response=>{
        this.responseCursos = response;
        this.listCurso = this.responseCursos.retorno;
      }
    );
  }

  cadastrarTurma(): void{
    console.log(this.turma);
    this.cadastrando = true;
    this.service.postInserirTurma(this.turma).subscribe(
      response => {
        console.log(response);
        this.requestSucess = true;
        this.responseTurma = response;
        console.log(this.responseTurma);
        this.titleModal = this.responseTurma.mensagem;
        if (this.responseTurma.retorno != null){
          this.mensagemModal = `IdTurma: ${this.responseTurma.retorno.cdCodigo} NomeTurma: ${this.responseTurma.retorno.nmTurma}`;
          this.turma = {
            cdCodigo: null,
            nmTurma: null,
            curso: null,
            dsPeriodo: null,
            stTurma: true
          };
        }else{
          this.mensagemModal = this.responseTurma.mensagem;
        }
        $('#mensagemModal').modal('show');
        this.cadastrando = false;
      },
      error => {
        console.log(error);
        this.requestSucess = false;
        if (error.error.mensagem != null){
          this.titleModal = error.error.mensagem;
          if(error.error.retorno != null){
            this.mensagemModal = `NomeTurma: ${error.error.retorno.nmTurma}, Já existe: ${error.error.retorno.cdCodigo} `;
          }else{
            this.mensagemModal = error.error.mensagem;
          }
        }else{
          this.titleModal = error.name;
          this.mensagemModal = error.message;
        }
        $('#mensagemModal').modal('show');
        this.cadastrando = false;
      }
    );
  }

  cursoSelecionado(){
    console.log(this.turma);
  }

}
