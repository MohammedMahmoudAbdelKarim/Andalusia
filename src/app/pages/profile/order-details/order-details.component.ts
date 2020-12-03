import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServerResponse } from 'http';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { APIsService } from "src/app/shared/services/apis.service";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { ToastersService } from "src/app/shared/services/toasters.service";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.scss"],
})
export class OrderDetailsComponent implements OnInit {
  user$: Observable<any> = this.dataShare.user$;
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  order: any = {};
  constructor(
    public toasters: ToastersService,
    private dataShare: DataShareService,
    private api: APIsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.api.GET<ServerResponse>('orders/' + params.order_id + '?expand=serials').subscribe((res: HttpResponse<ServerResponse>) => {
        this.order = res.body['data'];
        console.log(this.order);

      })
    });
  }

  ngOnInit() { }
}