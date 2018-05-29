import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {
  constructor(public storage: StorageService) {}

  createOrClearCart(): Cart {
    let cart: Cart = { itens: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();

    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if (position == -1) {
      cart.itens.push({ quantidade: 1, produto: produto });
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.itens.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.itens[position].quantidade++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO): Cart {
    let cart = this.getCart();
    let position = cart.itens.findIndex(x => x.produto.id == produto.id);
    if (position != -1) {
      cart.itens[position].quantidade--;

      if (cart.itens[position].quantidade < 1) {
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    let cart = this.storage.getCart();
    let sum = 0;
    for (let i = 0; i < cart.itens.length; i++) {
      sum += cart.itens[i].produto.preco * cart.itens[i].quantidade;
    }

    return sum;
  }
}
