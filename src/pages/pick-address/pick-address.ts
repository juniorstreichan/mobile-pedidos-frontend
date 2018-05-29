import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EnderecoDTO } from "./../../models/endereco.dto";
import { BaseInput } from "ionic-angular/util/base-input";

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html"
})
export class PickAddressPage {
  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua 16",
        numero: "300",
        complemento: "bem ali",
        bairro: "cohab nova",
        cep: "78025-493",
        cidade: {
          id: "33",
          nome: "Cuiaba",
          estado: {
            id: "1",
            nome: "Mato grosso"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua treze",
        numero: "665",
        complemento: "perto dad dona",
        bairro: "cohab velha",
        cep: "78025-493",
        cidade: {
          id: "33",
          nome: "Cuiaba",
          estado: {
            id: "1",
            nome: "Mato grosso"
          }
        }
      }
    ];
  }
}
