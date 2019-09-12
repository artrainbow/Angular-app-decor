import {Component, OnInit} from '@angular/core';
import {MainService} from "../main.service";
import {Product} from "../../model";
import {Response} from "@angular/http";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  items: Product[];

  constructor(private mainService: MainService) {
  }

  getMenu(data: Product[]) {
    return this.mainService.getMenu(data);
  }

  ngOnInit() {
    this.mainService.getData()
      .subscribe((data: Response) => {
        this.items = data.json()
      });
  }

}
