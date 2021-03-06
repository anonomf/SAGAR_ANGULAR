import { ResponseAPI } from 'src/app/reponseAPI/responseAPI.model';
import { Disciplina } from './disciplina.model';

export interface ResponseDisciplina extends ResponseAPI<Disciplina>{
  status: number;
  mensagem: string;
  retorno: Disciplina;
}
