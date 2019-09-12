import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Product} from "../model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Injectable()
export class MainService {

  productsUrl: string = 'http://localhost:2403/products';
  items: Product[];
  cart: Product[] = [];
  item: Product;


  constructor(private http: Http) {
  }


  addToCart(item: Product) {
    this.cart.push(item);
  }

  getCart() {
    return this.cart;
  }

  getCartLength() {
    return this.cart.length;
  }

  addCurrentItem(item: Product) {
    this.item = item;
  }

  getCurrentItem() {
    return this.item;
  }

  getData() {
    return this.http.get(this.productsUrl);
  }

  getById(id) {
    return this.http.get(this.productsUrl)
      .map(item => item.json()
        .filter(item => item.id == id))
  }

  getType(type) {
    return this.http.get(this.productsUrl)
      .map(item => item.json()
        .filter(item => item.type == type))
  }


  getMenu(data: Product[]) {
    let arr = [];
    if (data) {
      arr.push(data[0]);
      for (let i = 0; i < data.length; i++) {
        if (i < data.length - 1) {
          if (data[i].menu != data[i + 1].menu) {
            arr.push(data[i + 1]);
          }
        }
      }
    }
    return arr;
  }


}