import { CredentialsDTO } from './../../models/credentials.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';


@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentials: CredentialsDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }


  login() {

    if (this.credentials.email != '' && this.credentials.senha != '') {

      this.navCtrl.setRoot('CategoriasPage');
    }
  }
}
