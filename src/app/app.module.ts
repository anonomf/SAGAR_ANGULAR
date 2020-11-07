import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ProfessorCadastrarComponent } from './professor/professor-cadastrar/professor-cadastrar.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProfessorConsultarComponent } from './professor/professor-consultar/professor-consultar.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfessorCadastrarComponent,
    ProfessorConsultarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    CommonModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
