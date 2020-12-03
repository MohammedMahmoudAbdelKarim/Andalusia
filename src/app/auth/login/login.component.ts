import { CommonFunctionsService } from "./../../shared/services/commonFunctions.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { APIsService } from "src/app/shared/services/apis.service";
import { ToastersService } from "src/app/shared/services/toasters.service";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { ServerResponse } from "./../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl("youssef@test.com", [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl("123456789Youssef", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(45),
    ]),
  });

  constructor(
    private router: Router,
    private api: APIsService,
    private dataShare: DataShareService,
    private handleError: HandleErrorService,
    private toaster: ToastersService
  ) {}

  serverErrors$: Observable<any> = this.dataShare.serverErrors$;
  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;

  ngOnInit() {}

  login(form) {
    this.api
      .POST("login", form.value)
      .subscribe((res: HttpResponse<ServerResponse>) => {
        this.dataShare.saveUser("jwt", res.body.data.jwt);
        const user = this.dataShare.getUser();
        console.log(user);
        this.toaster.Success(
          `Welcome Back <span class="font-weight-bold">${user.username}!</span>`
        );
        this.router.navigateByUrl("/home");
      });
  }
}
