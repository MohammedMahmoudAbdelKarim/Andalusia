import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { DataShareService } from "src/app/shared/services/dataShare.service";

@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
})
export class ServicesComponent implements OnInit {
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  constructor(private dataShare: DataShareService) {}

  ngOnInit() {}
}
