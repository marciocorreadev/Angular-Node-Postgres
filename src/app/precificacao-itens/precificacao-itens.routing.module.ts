import { PrecificacaoItemForm } from './form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'nova/precificacao-item', component: PrecificacaoItemForm },
  {
    path: 'editar/precificacao-item/:id',
    component: PrecificacaoItemForm,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PrecificacaoRoutingModule {}
