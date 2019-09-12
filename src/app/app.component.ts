import {Component, OnInit} from '@angular/core';
import {MainService} from "./main.service";
import {Product} from "../model";
import {Response} from "@angular/http";
import {AdminService} from "./admin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  items: Product[];
  //data: Product[] = [];

  constructor(private mainService: MainService, private adminService: AdminService) {
  }

  getCartLength() {
    return this.mainService.getCartLength();
  }

  getMenu(data: Product[]) {
    return this.mainService.getMenu(data);
  }

  getStatusLogin() {
    return this.adminService.statusLogin;
  }

  ngOnInit() {
    this.mainService.getData()
      .subscribe((data: Response) => {
        this.items = data.json()
      });
  }
}
