import { DeleteComponent } from './delete/delete.component';
import { PrecificacaoItemForm } from './form/form.component';
import { PrecificacaoItensService } from './precificacao-itens.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-precificacao-itens',
  templateUrl: 'precificacao-itens.component.html',
  styleUrls: ['./precificacao-itens.component.css'],
})
export class PrecificacaoItensComponent implements OnInit {
  itensPrecos: any;
  msgError: string;
  constructor(
    private precificacaoItens: PrecificacaoItensService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.getPrices();
  }

  getPrices() {
    this.precificacaoItens.list().subscribe(res => {
      if (res['statusCode'] == 200) {
        this.itensPrecos = res['response']['prices']['rows'];
      } else {
        this.msgError = 'Não foram encontrados preços para serem exibidos!';
      }
    });
  }

  deletePrice(id) {
    console.log(id);
    this.precificacaoItens.save(id).subscribe(value => {
      console.log(value);
    });
  }

  openNewPrice(id) {
    this.precificacaoItens.loadByID(id).subscribe(res => {
      if (res['statusCode'] == 200) {
        let price = res['price'];
        price['id'] = undefined;
        this.openForm(price);
      }
    });
  }

  openEditPrice(id) {
    this.precificacaoItens.loadByID(id).subscribe(res => {
      if (res['statusCode'] == 200) {
        this.openForm(res['price']);
      }
    });
  }

  openDeletePrice(id) {
    this.openDelete(id);
  }

  openForm(price) {
    let context: any = {
      price,
    };
    this.dialogService.open(PrecificacaoItemForm, { context }).onClose.subscribe(() => {
      this.getPrices();
    });
  }
  openDelete(id) {
    let context: any = {
      id: id,
    };
    this.dialogService.open(DeleteComponent, { context }).onClose.subscribe(() => {
      this.getPrices();
    });
  }
}
