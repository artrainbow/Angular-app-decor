export class Product {
  id: string;
  category: string;
  type: string;
  menu: string;
  name: string;
  size: string;
  img: string;
  price: number;
}

export class User {
  id: string;
  name: string;
  password: string;

  constructor(id, name, password){
    this.id = id;
    this.name = name;
    this.password = password;
  }

}