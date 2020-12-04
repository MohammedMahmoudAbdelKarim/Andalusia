import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Duration } from "../enums/enums.enum";
import { Locale } from "../interfaces/localeInterface";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class DataShareService {
  constructor(
    private cf: CommonFunctionsService,
    private cookieService: CookieService
  ) {}

  localeSubject = new BehaviorSubject<Locale>({ dir: "", lang: "" });
  public locale$: Observable<Locale> = this.localeSubject.asObservable();

  loaderSubject = new BehaviorSubject(false);
  public loader$ = this.loaderSubject.asObservable();

  showSplashSubject = new BehaviorSubject(false);
  public showSplash$ = this.showSplashSubject.asObservable();

  // Init all date
  InitData() {
    this.initSplash();
    this.initLocale();
  }
  // Language and Directions
  initLocale() {
    const exsistLocale: Locale = this.cf.getLocalItem("locale");
    if (exsistLocale) {
      this.localeSubject.next(exsistLocale);
    } else {
      const locale = this.cf.getUserLocale();
      this.localeSubject.next(locale);
    }
  }

  changeAppLanguage(lang) {
    this.localeSubject.next({ lang, dir: lang === "ar" ? "rtl" : "ltr" });
    this.cf.setLocalItem("locale", this.localeSubject.value, Duration.year);
  }

  // Loader
  enableLoader() {
    this.loaderSubject.next(true);
  }
  disableLoader() {
    this.loaderSubject.next(false);
  }

  // Spalsh
  initSplash() {
    if (!this.cf.getLocalItem("visited")) {
      this.showSplash();
    }
    this.cf.setLocalItem("visited", "true", Duration.month);
  }

  showSplash() {
    this.showSplashSubject.next(true);
  }
  hideSplash() {
    this.showSplashSubject.next(false);
  }
}
