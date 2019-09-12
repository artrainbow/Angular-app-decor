import {Component, OnInit, OnChanges} from '@angular/core';
import {AdminService} from "../admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges {

  inputName: string;
  inputPassword: string;
  inputMessage: string;

  constructor(private adminService: AdminService) {
    this.getMessage();
  }

  setMessage() {
    return this.inputMessage = (this.adminService.statusLogin ? "Авторизация прошла успешно" : " Введите свой логин и пароль ");
  }

  getMessage() {
    return this.setMessage();
  }

  getStatusLogin() {
    return this.adminService.statusLogin;
  }

  login() {
    this.adminService.login(this.inputName, this.inputPassword)
      .subscribe(() => {
        this.setMessage();
/*        if (this.adminService.statusLogin) {
          this.router.navigate(['/admin/database']);
        }*/
      });
  }

  logout() {
    this.adminService.logout();
    this.getMessage();
  }


  ngOnInit() {
  }

  ngOnChanges() {
  }

}
