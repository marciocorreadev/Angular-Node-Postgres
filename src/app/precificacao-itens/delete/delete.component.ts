import { PrecificacaoItensService } from './../precificacao-itens.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-delete',
  template: `
    <style>
      nb-card {
        width: 21rem;
        height: 8rem;
      }
      nb-card nb-card-footer button[status='info'] {
        margin-right: 4rem;
      }
      i {
        color: var(--red);
        margin-left: 2rem;
      }
    </style>

    <nb-card accent="danger">
      <nb-card-body>
        Comfirma a exclusão do item? <i class="fas fa-trash-alt fa-2x"></i>
      </nb-card-body>
      <nb-card-footer>
        <button (click)="close()" nbButton hero status="info">Cancelar</button>
        <button (click)="remove(id)" nbButton hero status="danger">Excluir</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class DeleteComponent implements OnInit {
  id: number;
  constructor(
    private nbDialogRef: NbDialogRef<any>,
    private precificacaoItens: PrecificacaoItensService
  ) {}

  ngOnInit(): void {
    this.id = this.nbDialogRef.componentRef.instance.id;
  }

  close() {
    this.nbDialogRef.close();
  }

  remove(id) {
    this.precificacaoItens.remove(id).subscribe(res => {
      if (res['statusCode'] == 200) {
        this.close();
      }
    });
  }
}
