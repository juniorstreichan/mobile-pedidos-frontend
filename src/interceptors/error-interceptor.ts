import { FieldMessage } from "./../models/fieldmessage";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HTTP_INTERCEPTORS,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertController: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;

      if (errorObj.error) errorObj = errorObj.error;

      if (!errorObj.status) errorObj = JSON.parse(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;
        case 422:
          this.handle422(errorObj);
          break;
        default:
          this.handleDefaultError(errorObj);
          break;
      }

      console.log("Erro detectado pelo Interceptor");
      console.log(errorObj);
      return Observable.throw(errorObj);
    }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertController.create({
      title: "Falha na autenticação",
      message: "Email ou senha inválidos <br><small>Erro:401</small>",
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }

  handle422(errorObj) {
    let alert = this.alertController.create({
      title: "Erro de validação",
      enableBackdropDismiss: false,
      message: this.listErrors(errorObj.errors),
      buttons: [
        {
          text: "OK"
        }
      ]
    });
    alert.present();
  }


  handleDefaultError(errorObj) {
    let alert = this.alertController.create({
      title: errorObj.error,
      message:
        errorObj.message + "<br><small>Erro:" + errorObj.status + "</small>",
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }



  listErrors(messages: FieldMessage[]): string {
    let s: string = '';
    for (var i = 0; i < messages.length; i++) {
      s = s + '<p><strong>'+messages[i].fieldName+'</strong>'+messages[i].message+'</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
