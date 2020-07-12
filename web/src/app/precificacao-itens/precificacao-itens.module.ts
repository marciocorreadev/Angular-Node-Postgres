import { DeleteComponent } from './delete/delete.component';
import { PrecificacaoItemForm } from './form/form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

import { PrecificacaoRoutingModule } from './precificacao-itens.routing.module';
import { PrecificacaoItensService } from './precificacao-itens.service';
import { PrecificacaoItensComponent } from './precificacao-itens.component';
import {
  NbCardModule,
  NbListModule,
  NbTreeGridModule,
  NbButtonModule,
  NbInputModule,
  NbFormFieldModule,
  NbDialogModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [PrecificacaoItensComponent, PrecificacaoItemForm, DeleteComponent],
  entryComponents: [DeleteComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrecificacaoRoutingModule,
    NbCardModule,
    NbListModule,
    NbTreeGridModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbInputModule,
    NbFormFieldModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbDialogModule.forRoot(),
  ],
  providers: [PrecificacaoItensService, { provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class PrecificacaoItensModule {}
