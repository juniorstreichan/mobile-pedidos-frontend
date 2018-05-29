import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PedidoDTO } from "./../../models/pedido.dto";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-payment",
  templateUrl: "payment.html"
})
export class PaymentPage {
  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder
  ) {
    this.pedido = navParams.get("pedido");
    this.formGroup = formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    console.log(this.pedido);
  }
}
