import { Component } from "@angular/core";
import { StorageService } from "./../../services/storage.service";
import { ClienteService } from "./../../services/domain/cliente.service";
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storage: StorageService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.items = response['enderecos'];
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }
}
