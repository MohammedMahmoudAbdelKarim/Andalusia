import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { APIsService } from "src/app/shared/services/apis.service";
import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { ServerResponse } from "./../../shared/interfaces/serverResponseInterface";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"],
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  serverErrors$: Observable<any> = this.dataShare.serverErrors$;

  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;

  constructor(
    private handleError: HandleErrorService,
    private fb: FormBuilder,
    private router: Router,
    private api: APIsService,
    private cf: CommonFunctionsService,
    private dataShare: DataShareService
  ) {}

  ngOnInit() {
    this.dataShare.clearServerErrors();
    this.initForgetPasswordForm();
  }

  initForgetPasswordForm() {
    this.forgetPasswordForm = this.fb.group({
      email: [
        "kefoket654@aenmail.net",
        [Validators.required, Validators.email],
      ],
    });
  }

  onSubmit() {
    const email = this.forgetPasswordForm.get("email").value;

    const formBody = this.cf.toFormData({ email });

    this.api
      .POST("auth/request-password-reset", formBody)
      .subscribe((res: HttpResponse<ServerResponse>) => {
        // Adding data  to bind in check email component
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("type", "reset-password");

        this.router.navigate(["auth", "check-email"]);
      });
  }
}
