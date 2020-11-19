import { Component, OnInit } from '@angular/core';
import { ResponseCurso } from './../shared/cursoResponse';
import { CursoService } from './../shared/curso.service';
import { CordenadorService } from './../shared/cordenador.service';
import { ResponseCordenador } from './../shared/cordenadorResponse';
import { Cordenador } from './../shared/cordenador.model';
import { NgForm } from '@angular/forms';
import { DualListComponent } from 'angular-dual-listbox';
import { Curso } from '../shared/curso.model';
import { Disciplina } from '../shared/disciplina.model';
import { DisciplinaService } from '../shared/disciplina.service';
import { DiscipinasResponse } from '../shared/disciplinasResponse';

declare var $: any;

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {

  requestSucess = false;
  mensagemModal = '';
  titleModal = '';
  cadastrando = false;
  consulta = false;

  responseCordenador: ResponseCordenador;

  responseCurso: ResponseCurso;

  cordenador: Cordenador = {
    cdMatricula: null,
    nmCordenador: null,
    pwAcesso: null,
    stCordenador: true,
  };
  curso: Curso = {
    cdCurso: null,
    nmCurso: null,
    qtHora: null,
    cordenadorEntity: this.cordenador,
    disciplinas: [],
    stCurso: true
  };

  tab = 1;
  keepSorted = true;
  idDisciplina: string;
  display: any;
  filter = false;
  source: Array<any>;
  confirmed: Array<any>;
  userAdd = '';
  disabled = false;

  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;
  private sourceStations: Array<Disciplina>;
  private confirmedStations: Array<Disciplina>;
  disciplinasArray: Array<Disciplina>;

  disciplinasResponse: DiscipinasResponse;


  constructor(
    private disciplinaService: DisciplinaService,
    private cordenadorService: CordenadorService,
    private cursoService: CursoService
  ) {

  }

  ngOnInit(): void {
    this.disciplinaService.getListarDisciplinas().subscribe(
      response => {
        this.disciplinasResponse = response;
        this.disciplinasArray = this.disciplinasResponse.retorno;
        console.log(this.disciplinasArray);
        this.doReset();
      }
    );
  }

  private stationLabel(item: Disciplina): string {
    return `Nome: ${item.nmDisciplina} | Carga Horaria: ${item.qtHora}`;
  }

  private useStations(): void {
    this.idDisciplina = 'idDisciplina';
    this.display = this.stationLabel;
    this.keepSorted = true;
    this.source = this.sourceStations;
    this.confirmed = this.confirmedStations;
  }

  swapSource(): void {
    this.useStations();
  }

  doReset(): void {

    this.useStations();

  }

  doDelete(): void {
    if (this.source.length > 0) {
      this.source.splice(0, 1);
    }
  }

  doCreate(): void {
    if (typeof this.source[0] === 'object') {
      const o = {};
      o[this.idDisciplina] = this.source.length + 1;
      o[this.display] = this.userAdd;
      this.source.push(o);
    } else {
      this.source.push(this.userAdd);
    }
    this.userAdd = '';
  }

  doAdd(): void {
    for (let i = 0, len = this.source.length; i < len; i += 1) {
      const o = this.source[i];
      const found = this.confirmed.find((e: any) => e === o);
      if (!found) {
        this.confirmed.push(o);
        break;
      }
    }
  }

  doRemove(): void {
    if (this.confirmed.length > 0) {
      this.confirmed.splice(0, 1);
    }
  }

  doFilter(): void {
    this.filter = !this.filter;
  }

  filterBtn(): string {
    return (this.filter ? 'Hide Filter' : 'Show Filter');
  }

  doDisable(): void {
    this.disabled = !this.disabled;
  }

  disableBtn(): string {
    return (this.disabled ? 'Enable' : 'Disabled');
  }

  swapDirection(): void {
    this.sourceLeft = !this.sourceLeft;
    this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
  }

  alterarCurso(): void {
    this.cadastrando = !this.cadastrando;
    this.curso.cordenadorEntity = this.cordenador;
    this.curso.disciplinas = this.confirmed;
    console.log(this.curso);
    this.cursoService.putAlterarCurso(this.curso).subscribe(
      response => {
        this.requestSucess = true;
        this.responseCurso = response;
        this.titleModal = this.responseCurso.mensagem;
        if (this.responseCurso.retorno != null) {
          this.mensagemModal = `Cod. Curso: ${this.responseCurso.retorno.cdCurso} Professor: ${this.responseCurso.retorno.nmCurso}`;
          this.curso = {
            cdCurso: null,
            nmCurso: null,
            qtHora: null,
            cordenadorEntity: this.cordenador,
            disciplinas: [],
            stCurso: true
          };
          this.cordenador = {
            cdMatricula: null,
            nmCordenador: null,
            pwAcesso: null,
            stCordenador: true,
          };
          this.sourceStations = [];
          this.confirmedStations = [];
          this.consulta = false;
          this.doReset();
        } else {
          this.mensagemModal = this.responseCurso.mensagem;
        }
        $('#mensagemModal').modal('show');
        this.cadastrando = false;
      },
      error => {
        console.log(error);
        this.requestSucess = false;
        if (error.error.mensagem != null) {
          this.titleModal = error.error.mensagem;
          this.mensagemModal = error.error.mensagem;
        } else {
          this.titleModal = error.name;
          this.mensagemModal = error.message;
        }
        $('#mensagemModal').modal('show');
        this.cadastrando = false;
      }
    );
  }

  buscarCordenador(): void {
    if (this.cordenador.cdMatricula != null){
    this.cordenadorService.getBuscarCordenador(this.cordenador.cdMatricula).subscribe(
      respose => {
        console.log(respose);
        this.responseCordenador = respose;
        this.cordenador = this.responseCordenador.retorno;
      },
      error => {
        console.log(error);
        this.requestSucess = false;
        if (error.error.mensagem != null) {
          this.titleModal = error.error.mensagem;
          this.mensagemModal = error.error.mensagem;
        } else {
          this.titleModal = error.name;
          this.mensagemModal = error.message;
        }
        $('#mensagemModal').modal('show');
        this.cordenador = {
          cdMatricula: null,
          nmCordenador: null,
          pwAcesso: null,
          stCordenador: true,
        };
      }
    );
    }
  }

  buscarCurso(): void{
    this.cursoService.getBuscarCurso(this.curso.cdCurso).subscribe(
      respose => {
        console.log(respose.retorno);
        this.curso = respose.retorno;
        this.cordenador = this.curso.cordenadorEntity;
        this.disciplinaService.getListarDisciplinas().subscribe(
          response => {
            this.disciplinasResponse = response;
            this.disciplinasArray = this.disciplinasResponse.retorno;
          }
        );
        this.sourceStations = JSON.parse(JSON.stringify(this.disciplinasArray));
        this.confirmedStations = JSON.parse(JSON.stringify(this.curso.disciplinas));
        this.doReset();
        this.consulta = true;
      },
      error => {
        console.log(error);
        this.requestSucess = false;
        if (error.error.mensagem != null){
          this.titleModal = error.error.mensagem;
          this.mensagemModal = error.error.mensagem;
        }else{
          this.titleModal = error.name;
          this.mensagemModal = error.message;
        }
        this.cordenador = {
          cdMatricula: null,
          nmCordenador: null,
          pwAcesso: null,
          stCordenador: true,
        };
        this.curso = {
          cdCurso: null,
          nmCurso: null,
          qtHora: null,
          cordenadorEntity: this.cordenador,
          disciplinas: [],
          stCurso: true
        };
        this.sourceStations = [];
        this.confirmedStations = [];
        this.doReset();
        $('#mensagemModal').modal('show');
      }
    );
  }

  limpar(): void{
    this.consulta = false;
    this.cordenador = {
      cdMatricula: null,
      nmCordenador: null,
      pwAcesso: null,
      stCordenador: true,
    };
    this.curso = {
      cdCurso: null,
      nmCurso: null,
      qtHora: null,
      cordenadorEntity: this.cordenador,
      disciplinas: [],
      stCurso: true
    };
    this.sourceStations = [];
    this.confirmedStations = [];
    this.doReset();
  }

}
