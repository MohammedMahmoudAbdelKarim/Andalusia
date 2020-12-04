import { ToastersService } from "./../../../shared/services/toasters.service";
import { Component, OnInit } from "@angular/core";
import { CarouselConfig } from "ngx-bootstrap/carousel";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { DataShareService } from "src/app/shared/services/dataShare.service";
@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 5000, noPause: false, showIndicators: true },
    },
  ],
})
export class CarouselComponent implements OnInit {
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  constructor(
    private toaster: ToastersService,
    private dataShare: DataShareService
  ) {}

  // tslint:disable-next-line: no-empty
  ngOnInit() {}
}
