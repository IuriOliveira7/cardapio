import { Routes } from '@angular/router';
import { CrudComponent } from './page/crud/crud.component';
import { CardapioComponent } from './page/cardapio/cardapio.component';

export const routes: Routes = [
    { path: 'cadastrar', component: CrudComponent },
    { path: '', component: CardapioComponent },
];
