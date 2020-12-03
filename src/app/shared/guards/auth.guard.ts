import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (true) {
      return true;
    } else {
      this.router.navigateByUrl("/auth/login");
      return false;
    }
  }
}
