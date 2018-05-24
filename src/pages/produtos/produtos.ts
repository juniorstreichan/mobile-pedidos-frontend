import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProdutoDTO } from "../../models/produto.dto";

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html"
})
export class ProdutosPage {
  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        nome: "Mouse",
        preco: 80.44
      },
      {
        id: "2",
        nome: "PC",
        preco: 788.44
      }
    ];
  }
}
