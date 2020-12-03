import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { HttpResponse } from "@angular/common/http";
import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { APIsService } from "src/app/shared/services/apis.service";
import { ToastersService } from "src/app/shared/services/toasters.service";
import { Router } from "@angular/router";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { TermsAndConditionsComponent } from "./../../shared/components/termsAndConditions/termsAndConditions.component";
import { formValidation } from "./../../shared/constants";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  serverErrors$: Observable<any> = this.dataShare.serverErrors$;
  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;
  termsOpen = true;

  constructor(
    private handleError: HandleErrorService,
    private fb: FormBuilder,
    private cf: CommonFunctionsService,
    private api: APIsService,
    private dataShare: DataShareService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataShare.clearServerErrors();
    this.initRegisterForm();
  }

  openDialog(e: Event) {
    e.preventDefault();
    const dialogRef = this.dialog.open(TermsAndConditionsComponent, {
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  initRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ["Youssef Zidan", [Validators.required]],
      // lname: ["Zidan", [Validators.required]],
      email: ["youssef@test.com", [Validators.required, Validators.email]],
      password: [
        "123456789123",
        [
          Validators.required,
          Validators.minLength(formValidation.minLength),
          Validators.pattern(formValidation.passwordRegex),
        ],
      ],
      confirmPassword: ["123456789123", [Validators.required]],
      phoneNumber: [
        "01234567899",
        [
          Validators.required,
          CustomValidators.number,
          Validators.maxLength(formValidation.maxLength),
        ],
      ],
      termsConditions: [null, [Validators.required]],
    });

    // Match Password Validator
    this.registerForm
      .get("confirmPassword")
      .setValidators(
        CustomValidators.equalTo(this.registerForm.get("password"))
      );
  }

  register() {
    const form = this.registerForm.value;
    const newUser = {
      username: form.userName,
      email: form.email,
      password: form.password,
      password_repeat: form.confirmPassword,
      phone_number: form.phoneNumber,
    };
    const formBody = this.cf.toFormData(newUser);
    this.api.POST("signup", formBody).subscribe((res: HttpResponse<any>) => {
      // Adding data to bind in check email component
      sessionStorage.setItem("email", form.email);
      sessionStorage.setItem("type", "register");
      this.router.navigate(["auth", "check-email"]);
    });
  }

  openTerms() {
    this.termsOpen = true;
  }
  closeTerms() {
    this.termsOpen = false;
  }
}
