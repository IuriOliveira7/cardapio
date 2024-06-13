import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadersComponent } from '../../components/loaders/loaders.component';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, LoadersComponent],
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

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.loader = true;
    this.carregarDadosTituloCardapio();
    this.carregarDadosItensCardapio();
  }

  loader: boolean = false;

  tituloVazio: boolean = false;
  dadosTituloCardapio: any;
  carregarDadosTituloCardapio() {
    this.http.get<any[]>(this.apiUrltitulo)
      .subscribe(
        response => {
          this.dadosTituloCardapio = response;
          this.loader = false;

          if( this.dadosTituloCardapio.length <= 0){
            this.tituloVazio = true;
          } else{
            this.tituloVazio = false;
          }
      
          console.log(this.dadosTituloCardapio);
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
          this.loader = false;
        },
        error => {
          console.error('Erro ao carregar dados:', error);
        }
      );
  }
}
