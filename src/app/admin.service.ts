import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {User} from "../model";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

@Injectable()
export class AdminService {

  statusLogin: boolean = false;

  url: string = 'http://localhost:2403/admin/';

  constructor(private http: Http) {
  }

  public getUsers(): Observable<User[]> {
    let users = this.http.get(this.url)
      .map(this.extractUsers)
      .catch(this.handleError);
    return users;
  }

  private extractUsers(response: Response) {
    let res = response.json();
    let users: User[] = [];
    for (let i = 0; i < res.length; i++) {
      users.push(new User(res[i].id, res[i].name, res[i].password));
    }
    return users;
  }


  private handleError(error: any, cought: Observable<any>): any {
    let message = "";

    if (error instanceof Response) {
      let errorData = error.json().error || JSON.stringify(error.json());
      message = `${error.status} - ${error.statusText || ''} ${errorData}`
    } else {
      message = error.message ? error.message : error.toString();
    }

    console.log(message);

    return Observable.throw(message);
  }

  login(inputName: string, inputPassword: string): Observable<boolean> {
    return Observable.of(true)
      .do(val => {
        if (inputName == "artrainbow" && inputPassword == "Mob0667709099") {
          this.statusLogin = true;
        }
        return this.statusLogin;
      });
  }

  logout(): void {
    this.statusLogin = false;
  }


}
