import { HomePage } from './home';
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Component } from "@angular/core";
import { NavController, IonicPage, MenuController, AlertController } from "ionic-angular";
import { AuthService } from "./../../services/auth.service";
import { CredentialsDTO } from "./../../models/credentials.dto";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  creds: CredentialsDTO = {
    email: "",
    senha: ""
  };

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {
    this.formGroup = formBuilder.group({
      email: ["", [Validators.required]],
      senha:["", [Validators.required]]
    });
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      response => {
        this.auth.successfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriasPage");
      },
      error => {}
    );
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(
      response => {
        this.auth.successfullLogin(response.headers.get("Authorization"));
        this.navCtrl.setRoot("CategoriasPage");
      },
      error => {
        if(error.status == 403){
          let alert = this.alertCtrl.create({
            title: 'Falha na autenticação',
            subTitle: 'Login ou senha inválidos',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot("HomePage");
        }
      }
    );
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }
}
