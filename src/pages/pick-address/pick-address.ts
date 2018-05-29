import { CartService } from "./../../services/domain/cart.service";
import { PedidoDTO } from "./../../models/pedido.dto";
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
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storage: StorageService,
    public cartService: CartService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.items = response["enderecos"];
          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response["id"] },
            enderecoDeEntrega: null,
            pagamento: null,
            items: cart.itens.map(x => {
              return {
                quantidade: x.quantidade,
                produto: { id: x.produto.id }
              };
            })
          };
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

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id : item.id};
    console.log(this.pedido);
  }
}
