import { Component, OnInit } from "@angular/core";
import { AnimationOptions } from "ngx-lottie";
import { Router } from "@angular/router";
import { APIsService } from "./../../shared/services/apis.service";
import { CommonFunctionsService } from "./../../shared/services/commonFunctions.service";
import { ToastersService } from "./../../shared/services/toasters.service";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Observable } from "rxjs";
import { ServerResponse } from "./../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-checkYourEmail",
  templateUrl: "./checkYourEmail.component.html",
  styleUrls: ["./checkYourEmail.component.scss"],
})
export class CheckYourEmailComponent implements OnInit {
  serverErrors$: Observable<any> = this.dataShare.serverErrors$;

  options: AnimationOptions = {
    path: "assets/animations/email.json",
    loop: false,
  };

  email: string;
  type: string | "register" | "reset-password";
  constructor(
    private router: Router,
    private api: APIsService,
    private cf: CommonFunctionsService,
    private toasters: ToastersService,
    private dataShare: DataShareService
  ) {}

  ngOnInit() {
    this.dataShare.clearServerErrors();
    this.email = sessionStorage.getItem("email");
    this.type = sessionStorage.getItem("type");
  }

  changeEmail() {
    switch (this.type) {
      case "register":
        this.router.navigate(["auth", "register"]);
        break;
      case "reset-password":
        this.router.navigate(["auth", "forget-password"]);
        break;
      default:
        this.router.navigate(["auth", "login"]);
        break;
    }
  }

  resendEmail() {
    const email = this.cf.toFormData({ email: this.email });
    this.api
      .POST("auth/resend-verification-email", email)
      .subscribe((res: HttpResponse<ServerResponse>) => {
        this.toasters.Success("Email Sent!");
      });
  }
}
