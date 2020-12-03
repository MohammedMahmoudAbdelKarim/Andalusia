import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { CartComponent } from "./cart/cart.component";
import { ProfileComponent } from "./profile/profile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlifeFileToBase64Module } from "alife-file-to-base64";
import { MatSelectModule } from "@angular/material/select";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { LottieModule } from "ngx-lottie";
import { MatTabsModule } from "@angular/material/tabs";
import { FaqComponent } from "./faq/faq.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

import { OrdersListComponent } from "./profile/ordersList/ordersList.component";
import { OrderDetailsComponent } from './profile/order-details/order-details.component';

const routes: Routes = [
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "faq",
    component: FaqComponent,
  },
  {
    path: "order-details",
    component: OrderDetailsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AlifeFileToBase64Module,
    MatSelectModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    LottieModule,
    TranslateModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  declarations: [
    CartComponent,
    ProfileComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    OrdersListComponent,
    OrderDetailsComponent,
  ],
  exports: [],
})
export class PagesModule { }
