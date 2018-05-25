import { ProdutosPage } from './../produtos/produtos';
import { API_CONFIG } from './../../config/api.config';
import { CategoriaDTO } from './../../models/categoria.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';



@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService
  ) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    }, error => {}
    );
  }


showprodutos(categoria_id:string){
  this.navCtrl.push('ProdutosPage',{categoria_id:categoria_id});
}

  private log(arg) {
    console.log(arg);
  }

}
