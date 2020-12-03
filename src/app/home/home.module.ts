import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { Routes, RouterModule } from "@angular/router";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { DownloadAppComponent } from "./components/downloadApp/downloadApp.component";
import { ProductsComponent } from "./components/products/products.component";
import { OwlModule } from "ngx-owl-carousel";
import { CountersComponent } from './components/counters/counters.component';
import { CountToModule } from 'angular-count-to';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },

];

@NgModule({
  imports: [
    CommonModule,
    OwlModule,
    CountToModule,
    RouterModule.forChild(routes),
    CarouselModule.forRoot(),
    TranslateModule.forChild(),
  ],
  declarations: [
    HomeComponent,
    CarouselComponent,
    DownloadAppComponent,
    ProductsComponent,
    CountersComponent,
  ],
})
export class HomeModule { }
