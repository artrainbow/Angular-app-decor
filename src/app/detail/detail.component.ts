import {Component, OnInit, OnDestroy} from '@angular/core';
import {MainService} from "../main.service";
import {Product} from "../../model";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  item: Product;
  cart: Product[] = [];
  title: string = '';
  private subscription: Subscription;
  id: string;

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.params.subscribe(params => this.id = params['id']);
  }

  getTitle() {
    return this.title = this.item.category + ' ' + this.item.name;
  }

  addToCart(item: Product) {
    this.mainService.addToCart(item);
  }

  getCart() {
    this.mainService.getCart();
  }

  ngOnInit() {
    this.mainService.getById(this.id)
      .subscribe(data => this.item = data[0])
  }

  ngOnDestroy() {

  }

}
