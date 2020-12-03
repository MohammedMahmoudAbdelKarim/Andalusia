import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeadersInterceptor } from "./headersInterceptor";
import { LoadingInterceptor } from "./loadingInterceptor";
import { ServerErrorsInterceptor } from "./serverErrorsInterceptor";

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeadersInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorsInterceptor,
    multi: true,
  },
];
