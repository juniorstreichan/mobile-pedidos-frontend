import { PedidoService } from './../../services/domain/pedido.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationPage } from './order-confirmation';

@NgModule({
  declarations: [
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage),
  ],
  providers:[
    PedidoService
  ]
})
export class OrderConfirmationPageModule {}
