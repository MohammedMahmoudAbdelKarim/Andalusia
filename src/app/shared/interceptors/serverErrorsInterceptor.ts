import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { DataShareService } from "../services/dataShare.service";
import { Observable } from "rxjs";
import { HandleErrorService } from "../services/handleError.service";

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  response: HttpResponse<any>;
  constructor(
    private dataShare: DataShareService,
    private error: HandleErrorService
  ) {}

  // intercept function
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clear server Errors
    this.dataShare.clearServerErrors();

    // returning an observable to complete the request cycle
    return new Observable((observer) => {
      next.handle(req).subscribe(
        (res: HttpResponse<any>) => {
          if (res instanceof HttpResponse) {
            this.response = res;
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          // Display error message via toasters
          this.error.handleError(err);
          // passing the response to other interceptors in the chain
          observer.next(this.response);
        }
      );
    });
  }
}
