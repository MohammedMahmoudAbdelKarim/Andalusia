import { Router } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DataShareService } from "../../services/dataShare.service";
import { Observable } from "rxjs";
import { Locale } from "./../../interfaces/localeInterface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("mobileMenu", { static: true }) mobileMenu: ElementRef;
  @ViewChild("mobileContainer", { static: true }) mobileContainer: ElementRef;
  navClosed = true;
  language = "en";
  langBtn: string;
  constructor(private dataShare: DataShareService, private router: Router) {}

  ngOnInit() {
    this.displayLangBtn();
  }

  toggleMenu() {
    this.navClosed ? this.openNav() : this.closeNav();
  }

  openNav() {
    this.navClosed = false;
    this.mobileMenu.nativeElement.style.transform = "translateX(0px)";
    this.mobileContainer.nativeElement.style.right = "0";
  }

  closeNav() {
    this.navClosed = true;
    this.mobileMenu.nativeElement.style.transform = "translateX(-250px)";
    this.mobileContainer.nativeElement.style.right = "100%";
  }

  displayLangBtn() {
    this.dataShare.locale$.subscribe((locale: Locale) => {
      this.langBtn = locale.lang === "en" ? "ع" : "en";
    });
  }

  changeLang() {
    this.language = this.language === "ar" ? "en" : "ar";
    this.dataShare.changeAppLanguage(this.language);
  }
}
