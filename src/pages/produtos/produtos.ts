import { ProdutoDetailPage } from "./../produto-detail/produto-detail";
import { API_CONFIG } from "./../../config/api.config";
import { ProdutoService } from "./../../services/domain/produto.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ProdutoDTO } from "../../models/produto.dto";

@IonicPage()
@Component({
  selector: "page-produtos",
  templateUrl: "produtos.html"
})
export class ProdutosPage {
  items: ProdutoDTO[] = [];
  itemsModel: ProdutoDTO[] = [];
  private page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();
    let categoria_id = this.navParams.get("categoria_id");
    this.produtoService.findByCategoria(categoria_id, this.page, 6).subscribe(
      response => {
        let start = this.items.length;
        this.items = this.items.concat(response["content"]);
        this.itemsModel = this.items;
        let end = this.items.length - 1;
        console.log(response["content"]);
        console.log(this.itemsModel);
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(
        response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${
            item.id
          }-small.jpg`;
        },
        error => {}
      );
    }
  }

  showDetail(produto_id) {
    this.navCtrl.push("ProdutoDetailPage", { produto_id: produto_id });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  getItems(ev: any = "") {
    let val = ev.target.value;
    this.itemsModel = [];
    if (val && val.trim() != "") {
      this.itemsModel = this.items.filter(item => {
        return item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    } else {
      this.itemsModel = this.items;
    }
  }

  reset() {
    this.itemsModel = this.items;
  }

  doInfinite(infiniteScroll: any) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
