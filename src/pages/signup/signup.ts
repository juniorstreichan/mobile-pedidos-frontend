import { ClienteService } from "./../../services/domain/cliente.service";
import { EstadoDTO } from "./../../models/estado.dto";
import { CidadeDTO } from "./../../models/cidade.dto";
import { CidadeService } from "./../../services/domain/cidade.service";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { EstadoService } from "../../services/domain/estado.service";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  formGroup: FormGroup;
  cidades: CidadeDTO[];
  estados: EstadoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController
  ) {
    this.formGroup = formBuilder.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120)
        ]
      ],
      email: ["teste@teste.com", [Validators.required, Validators.email]],
      tipo: ["1", [Validators.required]],
      cpfOuCnpj: [
        "",
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14)
        ]
      ],
      senha: ["", [Validators.required]],
      complemento: ["", []],
      logradouro: ["", [Validators.required]],
      numero: ["", [Validators.required]],
      bairro: ["", []],
      cep: ["", [Validators.required, Validators.pattern("\\d{5}-\\d{3}")]],
      telefone1: ["", [Validators.required]],
      telefone2: ["", []],
      telefone3: ["", []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  signupUser() {
    console.log(this.formGroup);
    
    this.clienteService.insert(this.formGroup.value).subscribe(
      response => {
        this.showInsertOk();
      },
      error => {}
    );
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: "Sucesso",
      enableBackdropDismiss: false,
      message: "Cadastro efetuado com sucesso!",
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {}
    );
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {}
    );
  }
}
