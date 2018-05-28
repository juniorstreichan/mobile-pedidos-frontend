import { Cart } from "./../models/cart";
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { nullSafeIsEquivalent } from "@angular/compiler/src/output/output_ast";
import { localUser } from "./../models/local_user";

@Injectable()
export class StorageService {
  getLocalUser(): localUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(obj: localUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  getCart(): Cart {
    let cart = localStorage.getItem(STORAGE_KEYS.cart);
    if (cart != null) {
      return JSON.parse(cart);
    }
    return null;
  }

  setCart(obj: Cart) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    } else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    }
  }
}
