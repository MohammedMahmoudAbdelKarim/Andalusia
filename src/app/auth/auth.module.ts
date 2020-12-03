import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { CheckYourEmailComponent } from "./checkYourEmail/checkYourEmail.component";
import { LottieModule } from "ngx-lottie";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedModule } from "./../shared/shared.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent,
  },
  {
    path: "check-email",
    component: CheckYourEmailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    LottieModule,
    MatCheckboxModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    CheckYourEmailComponent,
  ],
})
export class AuthModule {}
