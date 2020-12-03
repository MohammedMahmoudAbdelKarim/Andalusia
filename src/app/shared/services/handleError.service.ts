import { Injectable } from "@angular/core";
import { ToastersService } from "./toasters.service";
import { HttpErrorResponse } from "@angular/common/http";
import { FormGroup } from "@angular/forms";
import { DataShareService } from "./dataShare.service";
import { formValidation } from "./../constants";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HandleErrorService {
  constructor(
    private toasters: ToastersService,
    private dataShare: DataShareService,
    private router: Router
  ) {}

  // Handling HTTP Errors using Toaster
  public handleError(err: HttpErrorResponse) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          errorMessage = `Bad Request.`;
          break;
        case 401:
          errorMessage = `You need to log in to do this action.`;
          setTimeout(() => {
            this.router.navigate(["auth", "login"]);
          }, 1000);
          break;
        case 403:
          errorMessage = `You don't have permission to access the requested resource.`;
          break;
        case 404:
          errorMessage = `The requested resource does not exist.`;
          break;
        case 412:
          errorMessage = `Precondition Failed.`;
          break;
        case 500:
          errorMessage = `Internal Server Error.`;
          break;
        case 503:
          errorMessage = `The requested service is not available.`;
          break;
        case 422:
          errorMessage = "Validation Error!";
          this.handleBackendValidations(err);
          break;
        default:
          errorMessage = `Something went wrong!`;
      }
    }
    if (errorMessage) {
      this.toasters.Error(errorMessage);
    }
  }

  // Displaying Forms Validation Messages
  public getFormValidationMessage(form: FormGroup, input: string): string {
    if (form.get(input).hasError("required")) {
      return "This field is required!";
    }
    if (form.get(input).hasError("email")) {
      return "Please enter a valid email address";
    }
    if (form.get(input).hasError("minlength")) {
      return `You have to enter at least ${formValidation.minLength} lettrs`;
    }
    if (form.get(input).hasError("maxlength")) {
      return `The maximum letters required are ${formValidation.maxLength} letters`;
    }
    if (form.get(input).hasError("equalTo")) {
      return "Passwords don't match";
    }
    if (form.get(input).hasError("pattern")) {
      return "Password must contain at least 1 Uppercase, 1 Lowercase and a number";
    }
    if (form.get(input).hasError("number")) {
      return "You have to enter a number";
    }
  }

  // Form Validation Messages for *ngIf
  public showValidationError(form: FormGroup, input: string): boolean {
    return !form.get(input).valid && form.get(input).touched;
  }

  // Handling backend custom error messages
  public handleBackendValidations(error: HttpErrorResponse) {
    const errors = {};

    for (const key in error.error.errors) {
      if (Object.prototype.hasOwnProperty.call(error.error.errors, key)) {
        errors[key] = error.error.errors[key];
      }
    }
    // adding error obj to the global serverError Observable
    this.dataShare.addServerErrors(errors);
  }
}
