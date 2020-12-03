import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  response: HttpResponse<any>;

  constructor(private cookieService: CookieService) {}

  // intercept function
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const JWT = this.cookieService.get("jwt");
    if (JWT) {
      const requWithJWT = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${JWT}`),
      });
      return next.handle(requWithJWT);
    } else {
      return next.handle(req);
    }
  }
}
