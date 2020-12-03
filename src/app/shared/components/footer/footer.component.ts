import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

import { Locale } from "src/app/shared/interfaces/localeInterface";
import { DataShareService } from "../../services/dataShare.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  constructor(private dataShare: DataShareService) {}

  ngOnInit() {}
}
