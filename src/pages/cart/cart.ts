import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from "./../../config/api.config";
import { ProdutoService } from "./../../services/domain/produto.service";
import { StorageService } from "./../../services/storage.service";
import { CartItem } from "./../../models/cart-item";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})
export class CartPage {
  itens: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService
  ) {}

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.itens = cart.itens;
    this.loadImageUrls;
  }

  loadImageUrls() {
    for (var i = 0; i < this.itens.length; i++) {
      let item = this.itens[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(
        response => {
          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
            item.produto.id
          }-small.jpg`;
        },
        error => {}
      );
    }
  }
}
