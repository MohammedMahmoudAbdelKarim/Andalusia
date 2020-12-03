import { Component, OnInit } from "@angular/core";
import { DataShareService } from "./shared/services/dataShare.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { delay } from "rxjs/operators";
import { Locale } from "./shared/interfaces/localeInterface";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  direction: string;
  lang: string;
  constructor(
    public dataShare: DataShareService,
    public translate: TranslateService,
    private cf: CommonFunctionsService
  ) {}
  loader$: Observable<boolean> = this.dataShare.loader$.pipe(delay(0));
  showSplash$: Observable<boolean> = this.dataShare.showSplash$;

  ngOnInit() {
    this.dataShare.InitData();
    this.initUserLanguage();
  }

  onRouterChange() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  initUserLanguage() {
    this.translate.addLangs(["en", "ar"]);
    this.dataShare.locale$.subscribe((locale: Locale) => {
      this.translate.setDefaultLang(locale.lang);
      this.direction = locale.dir;
      this.lang = locale.lang;
    });
  }
}
