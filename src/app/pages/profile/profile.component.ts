import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { ToastersService } from "src/app/shared/services/toasters.service";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Observable } from "rxjs";
import { AnimationOptions } from "ngx-lottie";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { APIsService } from "src/app/shared/services/apis.service";
import { OrderHistory } from "../../shared/interfaces/orderHistoryInterface";
import { ServerResponse } from "./../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";
import { formValidation } from "./../../shared/constants";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  orderHistory$: Observable<OrderHistory[]> = this.api
    .GET<ServerResponse>("orders", { expand: "serials" })
    .pipe(map((res: HttpResponse<ServerResponse>) => res.body.data));

  profileForm: FormGroup;
  passwordForm: FormGroup;
  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;
  user$: Observable<any> = this.dataShare.user$;
  serverErrors$: Observable<any> = this.dataShare.serverErrors$;

  options: AnimationOptions = {
    path: "assets/animations/noContent.json",
    loop: true,
  };

  constructor(
    public toasters: ToastersService,
    private handleError: HandleErrorService,
    private fb: FormBuilder,
    private dataShare: DataShareService,
    private router: Router,
    private api: APIsService
  ) {}

  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );

  ngOnInit() {
    this.initProfileForm();
    this.initPasswordForm();
    this.user$.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue({
          username: user.username,
        });
      } else {
        this.router.navigate(["auth", "login"]);
      }
    });
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      image: [null],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      phoneNumber: [
        "",
        [
          Validators.required,
          CustomValidators.number,
          Validators.maxLength(45),
        ],
      ],
    });
  }

  initPasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: [
        "",
        [Validators.required, Validators.minLength(formValidation.minLength)],
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(formValidation.minLength),
          Validators.pattern(formValidation.passwordRegex),
        ],
      ],
      confirmPassword: ["", [Validators.required]],
    });

    // Match Password Validator
    this.passwordForm
      .get("confirmPassword")
      .setValidators(
        CustomValidators.equalTo(this.passwordForm.get("password"))
      );
  }

  // Upload IMG
  profileIMG(e) {
    this.profileForm.patchValue({
      image: e[0].base64,
    });
  }

  // Removing IMG
  removeIMG() {
    this.profileForm.patchValue({
      image: "",
    });
  }

  submitProfileForm(form) {
    const body = {
      username: form.username,
      phone: form.phoneNumber,
      oldPassword: form.password,
    };

    this.api
      .PATCH("profile", body)
      .subscribe((res: HttpResponse<ServerResponse>) => {
        this.toasters.Success(
          `Success! <br /> <span class="font-weight-bold">You need to log in again!</span>`
        );
        setTimeout(() => {
          this.dataShare.removeUser();
          this.router.navigate(["auth", "login"]);
        }, 2000);
      });
  }
  submitPasswordForm(form) {
    const body = {
      oldPassword: form.oldPassword,
      newPassword: form.password,
      newPasswordRepeat: form.confirmPassword,
    };

    this.api
      .PATCH("profile", body)
      .subscribe((res: HttpResponse<ServerResponse>) => {
        this.toasters.Success("Password Changed!");
      });
  }
}
