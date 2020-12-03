import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;

  options: AnimationOptions = {
    path: "assets/animations/sendEmail.json",
  };

  constructor(
    private fb: FormBuilder,
    public handleError: HandleErrorService
  ) {}

  ngOnInit() {
    this.initContactForm();
  }

  initContactForm() {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      reason: [null, [Validators.required]],
      title: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }
}
