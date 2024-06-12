import { Component } from '@angular/core';
import { DataService } from '../../service/dataService/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  titulo: any
  descricao: any

  private apiUrl = 'https://main--digitalcardapio.netlify.app/data';

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.carregarDados();
  }

  nextId = '1';

  generateId(): string {
    const currentId = this.nextId;
    this.nextId = String(Number(this.nextId) + 1); // Incrementa o ID
    return currentId;
  }

  cadastrar() {
    const dados = {
      id: this.generateId(),
      titulo: this.titulo,
      descricao: this.descricao
    };

    this.http.post<any>(this.apiUrl, dados)
      .subscribe(
        response => {
          console.log('Dados cadastrados com sucesso:', response);
          this.carregarDados();
        },
        error => {
          console.error('Erro ao cadastrar dados:', error);
        }
      );
  }

  dados: any;
  carregarDados() {
    this.http.get<any[]>(this.apiUrl)
      .subscribe(
        response => {
          console.log('Dados carregados:', response);
          this.dados = response;
        },
        error => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }

  deletarDados(id: number) {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete<any>(url)
      .subscribe(
        response => {
          console.log('Dados excluídos com sucesso:', response);
          // Após a exclusão, recarrega os dados
          this.carregarDados();
        },
        error => {
          console.error('Erro ao excluir dados:', error);
        }
      );
  }

}
