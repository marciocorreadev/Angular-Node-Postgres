import { ItemPreco } from './../ItemPreco';
import { PrecificacaoItensService } from './../precificacao-itens.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-precificacao-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class PrecificacaoItemForm implements OnInit {
  form: FormGroup;
  formEdit: ItemPreco;
  validForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private nbDialogRef: NbDialogRef<any>,
    private precificacaoItens: PrecificacaoItensService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null, []],
      ValorCompra: [null, []],
      PercCreditoICMS: [null, []],
      ValorCreditoICMS: [null, []],
      PercFrete: [null, []],
      ValorFrete: [null, []],
      PercIPI: [null, []],
      ValorIPI: [null, []],
      PercICMSST: [null, []],
      ValorICMSST: [null, []],
      ValorAdicionalCompra: [null, []],
      PercMargemLucro: [null, []],
      ValorMargemLucro: [null, []],
      ValorVenda: [null, [Validators.required]],
    });

    this.formEdit = this.nbDialogRef.componentRef.instance.price;
    if (this.formEdit) {
      this.form.get('id').setValue(this.formEdit.id);
      for (const key in this.formEdit) {
        if (/^Valor.+$/.test(key)) {
          this.formEdit[key] *= 100;
          if (this.formEdit[key]) {
            this.formatMoney({ name: key, value: this.formEdit[key].toString() });
          }
        } else if (/^Perc.+/.test(key)) {
          this.formEdit[key] *= 100;
          if (this.formEdit[key]) {
            this.formatPercent({ name: key, value: this.formEdit[key].toString() });
          }
        }
      }
    }
  }

  calculateTotal() {
    let ValorMargemLucro: any = this.formatNumber(this.form.get('ValorCompra').value);

    if (this.form.get('ValorCreditoICMS').value) {
      ValorMargemLucro += this.formatNumber(this.form.get('ValorCreditoICMS').value);
    }
    if (this.form.get('ValorFrete').value) {
      ValorMargemLucro += this.formatNumber(this.form.get('ValorFrete').value);
    }
    if (this.form.get('ValorIPI').value) {
      ValorMargemLucro += this.formatNumber(this.form.get('ValorIPI').value);
    }
    if (this.form.get('ValorAdicionalCompra').value) {
      ValorMargemLucro += this.formatNumber(this.form.get('ValorAdicionalCompra').value);
    }
    if (this.form.get('ValorICMSST').value) {
      ValorMargemLucro -= this.formatNumber(this.form.get('ValorICMSST').value);
    }
    ValorMargemLucro = ValorMargemLucro.toFixed(2);
    let ValorMargemLucroString = ValorMargemLucro.toString();
    this.formatMoney({ name: 'ValorMargemLucro', value: ValorMargemLucroString });
    this.calcMKPTotal();
  }

  calcAllCost() {
    if (this.form.get('ValorCreditoICMS').value) {
      this.calcPrice('ValorCreditoICMS', 'PercCreditoICMS');
    }
    if (this.form.get('ValorICMSST').value) {
      this.calcPrice('ValorICMSST', 'PercICMSST');
    }
    if (this.form.get('ValorFrete').value) {
      this.calcPrice('ValorFrete', 'PercFrete');
    }
    if (this.form.get('ValorIPI').value) {
      this.calcPrice('ValorIPI', 'PercIPI');
    }
  }

  calcTotalMKP() {
    if (this.form.get('ValorMargemLucro').value) {
      const ValorMargemLucro = this.formatNumber(this.form.get('ValorMargemLucro').value);
      const PercMargemLucro = this.formatNumber(this.form.get('PercMargemLucro').value);
      let venda: any = ((ValorMargemLucro * PercMargemLucro) / 100 + ValorMargemLucro).toFixed(2);
      const vendaString: string = venda.toString();
      this.formatMoney({ name: 'ValorVenda', value: vendaString });
    } else {
      const ValorCompra = this.formatNumber(this.form.get('ValorCompra').value);
      const PercMargemLucro = this.formatNumber(this.form.get('PercMargemLucro').value);
      let venda: any = ((ValorCompra * PercMargemLucro) / 100 + ValorCompra).toFixed(2);
      const vendaString: string = venda.toString();
      this.formatMoney({ name: 'ValorVenda', value: vendaString });
    }
  }

  calcMKPTotal() {
    if (this.form.get('ValorVenda').value) {
      if (this.form.get('ValorMargemLucro').value) {
        this.formatPercentMKP('ValorMargemLucro');
      } else {
        if (this.form.get('ValorCompra').value) {
          this.formatPercentMKP('ValorCompra');
        }
      }
    }
  }

  formatPercentMKP(param: any) {
    const ValorVenda = this.formatNumber(this.form.get('ValorVenda').value);
    const valorCompra = this.formatNumber(this.form.get(param).value);
    const valueNumber = (((ValorVenda - valorCompra) / valorCompra) * 100).toFixed(2);
    const valueString: string = valueNumber.toString();
    this.formatPercent({ name: 'PercMargemLucro', value: valueString });
  }

  calcPrice(base: string | (string | number)[], mult: string | (string | number)[]) {
    const multValue: number = this.formatNumber(this.form.get(mult).value);
    const ValorCompra: number = this.formatNumber(this.form.get('ValorCompra').value);
    const valueNumber = ((multValue * ValorCompra) / 100).toFixed(2);
    const valueString: string = valueNumber.toString();
    this.formatMoney({ name: base, value: valueString });
    this.calculateTotal();
  }

  calcPercent(base: string | (string | number)[], div: string | (string | number)[]) {
    const divValue: number = this.formatNumber(this.form.get(div).value);
    const ValorCompra: number = this.formatNumber(this.form.get('ValorCompra').value);
    const valueNumber = ((divValue / ValorCompra) * 100).toFixed(2);
    const valueString: string = valueNumber.toString();
    this.formatPercent({ name: base, value: valueString });
    this.calculateTotal();
  }

  validateCostPrice() {
    if (this.form.get('ValorCompra').value) {
      let ValorCompra = this.formatNumber(this.form.get('ValorCompra').value);
      return ValorCompra > 0 ? false : true;
    } else {
      return true;
    }
  }

  formatMoney(i) {
    let { value, name } = i;
    let v = value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
    this.form.get(name).setValue(v);
  }

  formatPercent(i) {
    let state = '';
    let { value, name } = i;
    if (parseInt(value) < 0) {
      state = '-';
    }
    let v = value.replace(/\D/g, '');
    v = (v / 100).toFixed(2) + '';
    this.form.get(name).setValue(`${state}${v}`);
  }

  formatNumber(value) {
    if (isNaN(value)) {
      value = value.replace('.', '');
      value = value.replace(',', '.');
      return parseFloat(value);
    } else {
      return value;
    }
  }

  close() {
    this.nbDialogRef.close();
  }

  save() {
    if (this.form.status == 'VALID') {
      let price = {
        id: this.form.get('id').value,
      };

      for (const key in this.form.value) {
        if (this.form.value[key]) {
          price[key] = this.formatNumber(this.form.value[key]);
        }
      }
      this.precificacaoItens.save(price).subscribe(res => {
        if (res['statusCode'] == 200) {
          this.close();
        }
      });
    } else {
      this.validForm = !this.form.controls.ValorVenda.touched;
    }
  }
}
