import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})
export class CardapioComponent {

  cardapio: any[] = [
    {
      tituloCardapio: 'Cardápio',
      descricaoCardapio: 'ALMOÇO ESPECIAL',
    }
  ]

  itens: any[] = [
    {
      titulo: 'Prato Principal',
      descricoes: [
        { titulo: 'Título', descricao: 'Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato' },
        { titulo: 'Título', descricao: 'Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato' },
      ]
    },
    {
      titulo: 'Prato Principal',
      descricoes: [
        { titulo: 'Título', descricao: 'Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato' },
        { titulo: 'Título', descricao: 'Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato Descrição do Prato' },
      ]
    },
    // Adicione mais itens conforme necessário
  ];

  
  private apiUrlDados = 'https://tested-charm-plier.glitch.me/data';
  private apiUrltitulo = 'https://tested-charm-plier.glitch.me/cardapio';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(){
    this.carregarDadosTituloCardapio();
    this.carregarDadosItensCardapio();

  }

  dadosTituloCardapio: any;
  carregarDadosTituloCardapio() {
    this.http.get<any[]>(this.apiUrltitulo)
      .subscribe(
        response => {
          console.log('Dados:', response);
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
          console.log('Dados ITEM:', response);
          this.dadosItens = response;
        },
        error => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }

}
