import { Component, OnInit } from "@angular/core";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ToastersService } from "./../../../shared/services/toasters.service";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { ServerResponse } from "./../../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
})
export class NewsComponent implements OnInit {
  isAdded = false;
  carouselOptions: any = {};
  responsiveWithParts = {
    0: { items: 1.2 },
    425: { items: 1.2 },
    768: { items: 2.2 },
    1024: { items: 3.2 },
  };
  responsive = {
    0: { items: 1.2 },
    425: { items: 1.2 },
    768: { items: 2.2 },
    1024: { items: 3 },
  };
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );

  constructor(
    private dataShare: DataShareService,
    private toasters: ToastersService
  ) {}

  ngOnInit() {
    this.initOwlCarosel();
  }

  initOwlCarosel() {
    this.carouselOptions = {
      margin: 5,
      loop: true,
      nav: true,
      responsiveClass: true,
      responsive: this.responsive,
    };
  }
}
