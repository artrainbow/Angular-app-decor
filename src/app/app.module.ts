import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MainService} from "./main.service";
import {AdminService} from "./admin.service";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {CartComponent} from './cart/cart.component';
import {DetailComponent} from './detail/detail.component';
import {CatalogComponent} from './catalog/catalog.component';
import {IndexComponent} from './index/index.component';
import {AdminComponent} from './admin/admin.component';
import {DbComponent} from "./db/db.component";

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    DetailComponent,
    CatalogComponent,
    IndexComponent,
    AdminComponent,
    DbComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: 'cart', component: CartComponent},
      {path: 'detail/:id', component: DetailComponent},
      {path: 'catalog/:type', component: CatalogComponent},
      {path: 'catalog', component: CatalogComponent},
      {path: 'admin', component: AdminComponent},
      {path: 'admin/database', component: DbComponent},
      {path: '', component: IndexComponent},
    ])
  ],
  providers: [MainService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
