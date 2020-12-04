import { OverviewComponent } from "./components/overview/overview.component";
import { NewsComponent } from "./components/news/news.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { Routes, RouterModule } from "@angular/router";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { OwlModule } from "ngx-owl-carousel";
import { CountersComponent } from "./components/counters/counters.component";
import { CountToModule } from "angular-count-to";
import { TranslateModule } from "@ngx-translate/core";
import { PartnersComponent } from './components/partners/partners.component';
import { OfficersComponent } from './components/officers/officers.component';
import { ServicesComponent } from './components/services/services.component';

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
    OverviewComponent,
    NewsComponent,
    CountersComponent,
    PartnersComponent,
    OfficersComponent,
    ServicesComponent,
  ],
})
export class HomeModule {}
