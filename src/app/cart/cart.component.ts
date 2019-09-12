import { Component, OnInit, Input } from '@angular/core';
import { MainService } from "../main.service";
import { Product } from "../../model";

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input()
  item:Product;

	cart: Product[];


	title: string = 'Корзина';

	constructor(private mainService: MainService) {
		this.cart = mainService.cart;
	}

	calcSum(){
		let sum: number = 0;
		for(let i=0; i<this.cart.length; i++){
		sum += this.cart[i].price;
			}
		return sum;
	}

  addCurrentItem(item: Product) {
    this.mainService.addCurrentItem(item);
  }


	delete(item: Product) {
		let index = this.cart.indexOf(item);
		if(index > -1) this.cart.splice(index, 1);
	}

	ngOnInit() {
	}
}
