import {Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import {Response} from "@angular/http";
import {MainService} from "../main.service";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";

import {Product} from "../../model";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements  OnInit, OnChanges, DoCheck {

  items: Product[] = [];
  itemsCategory: Product[] = [];
  cart: Product[] = [];
  item: Product;
  sort: number = Infinity;
  private subscription: Subscription;
  type: string;
  productsPerPage = 3;
  selectedPage = 1;
  itemsFiltred: string[] = [];


  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute) {
    this.subscription = activatedRoute.params.subscribe(params => {
      this.type = params['type'];
      this.selectedPage = 1;
    });

  }


  addCurrentItem(item: Product) {
    this.mainService.addCurrentItem(item);
  }

  getCurrentItem() {
    return this.mainService.getCurrentItem();
  }

  addToCart(item: Product) {
    this.mainService.addToCart(item);
  }

  getCart() {
    this.mainService.getCart();
  }

  getCartLength() {
    return this.mainService.getCartLength();
  }

  getSortAsc(items: Product[]) {
    this.sort = 0;
    items.sort((a, b) => a.price - b.price);
  }

  getSortDesc(items: Product[]) {
    this.sort = 1;
    items.sort((a, b) => b.price - a.price);
  }

  getItemsOfCategory(category) {
    return this.itemsCategory = this.items.filter(item => item.type == category);
  }

  //* Pagination

  getItemsPagination(category): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.getItemsOfCategory(category).slice(pageIndex, pageIndex + this.productsPerPage);
  }

  getItemsPaginationNoCat(): Product[] {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.items.slice(pageIndex, pageIndex + this.productsPerPage);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  getPageNumbers(): number[] {
    return Array(Math.ceil(this.itemsCategory.length / this.productsPerPage))
      .fill(0).map((x, i) => i + 1);
  }

  getPageNumbersNoCat(): number[] {
    return Array(Math.ceil(this.items.length / this.productsPerPage))
      .fill(0).map((x, i) => i + 1)
  }


  ngOnInit() {
    this.mainService.getData()
      .subscribe((data: Response) => {
        this.items = data.json()
      });

    this.mainService.getType(this.type)
      .subscribe(data => this.item = data[0]);

  }

  ngOnChanges(){

  }

  ngDoCheck(){

    //this.changePage();
    //this.selectedPage = 1;
  }
}
