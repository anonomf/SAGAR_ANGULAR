import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TurmaComponent } from './turma/turma.component';
import { FormsModule }   from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ProfessorCadastrarComponent } from './professor/professor-cadastrar/professor-cadastrar.component';

@NgModule({
  declarations: [
    AppComponent,
    TurmaComponent,
    HeaderComponent,
    ProfessorCadastrarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
