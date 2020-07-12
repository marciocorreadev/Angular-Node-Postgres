import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrecificacaoItensComponent } from './precificacao-itens/precificacao-itens.component';

const routes: Routes = [
  { path: 'precificacao-itens', component: PrecificacaoItensComponent },
  { path: '', component: PrecificacaoItensComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
