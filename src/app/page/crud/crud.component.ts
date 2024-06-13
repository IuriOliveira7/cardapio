import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  private apiUrlDados = 'https://tested-charm-plier.glitch.me/data';
  private apiUrltitulo = 'https://tested-charm-plier.glitch.me/cardapio';

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.carregarDadosTituloCardapio();
    this.carregarDadosItensCardapio();

  }

  dadosTituloCardapio: any;
  carregarDadosTituloCardapio() {
    this.http.get<any[]>(this.apiUrltitulo)
      .subscribe(
        response => {
          this.dadosTituloCardapio = response;
        },
        error => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }

  dadosItens: any;
  carregarDadosItensCardapio() {
    this.http.get<any[]>(this.apiUrlDados)
      .subscribe(
        response => {
          this.dadosItens = response;
        },
        error => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }


  nextId = '1';
  generateId(): string {
    const currentId = this.nextId;
    this.nextId = String(Number(this.nextId) + 1); // Incrementa o ID
    return currentId;
  }


  tituloCardapio: any;
  descricaoTopoCardapio: any;
  cadastrarTitulo() {
    const dados = {
      id: this.generateId(),
      titulo: this.tituloCardapio,
      descricao: this.descricaoTopoCardapio,
    };

    this.http.post<any>(this.apiUrltitulo, dados)
      .subscribe(
        response => {
          this.carregarDadosTituloCardapio();
          this.tituloCardapio = '';
          this.descricaoTopoCardapio = '';
        },
        error => {
          console.error('Erro ao cadastrar dados:', error);
        }
      );
  }


  titulo: any;
  tituloItem: any;
  descricaoItem: any;
  descricoes: any[] = [];
  
  adicionarDescricao() {
    const descricao = {
      id: this.generateId(),
      titulo: this.tituloItem,
      descricao: this.descricaoItem
    };

    this.descricoes.push(descricao);
    this.tituloItem = '';
    this.descricaoItem = '';
  }

  cadastrarItem() {
    const dados = {
      id: this.generateId(),
      titulo: this.titulo,
      descricao: this.descricoes,
    };

    this.http.post<any>(this.apiUrlDados, dados)
      .subscribe(
        response => {
          this.carregarDadosItensCardapio();
          this.titulo = '';
          this.tituloItem = '';
          this.descricaoItem = '';
        },
        error => {
          console.error('Erro ao cadastrar dados:', error);
        }
      );
  }



  deletarTituloDesc(id: number) {
    const url = `${this.apiUrltitulo}/${id}`;
    this.http.delete<any>(url)
      .subscribe(
        response => {
          this.carregarDadosTituloCardapio();
        },
        error => {
          console.error('Erro ao excluir dados:', error);
        }
      );
  }

  deletarItem(id: number) {
    const url = `${this.apiUrlDados}/${id}`;
    this.http.delete<any>(url)
      .subscribe(
        response => {
          this.carregarDadosItensCardapio();
        },
        error => {
          console.error('Erro ao excluir dados:', error);
        }
      );
  }
}
