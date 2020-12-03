import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
@Injectable()
export class APIsService {
  constructor(private httpClient: HttpClient) {}

  /* --------------------------- POST Method -------------------------- */
  POST<T>(url, body, params?) {
    return this.httpClient.post<T>(`${environment.baseUrl}${url}`, body, {
      params: { ...params },
      observe: "response",
    });
  }
  /* --------------------------- GET Method -------------------------- */
  GET<T>(url, params?) {
    return this.httpClient.get<T>(`${environment.baseUrl}${url}`, {
      params: { ...params },
      // tslint:disable-next-line: object-literal-shorthand
      observe: "response",
    });
  }
  /* --------------------------- DELETE Method -------------------------- */
  DELETE<T>(url, params?) {
    return this.httpClient.delete<T>(`${environment.baseUrl}${url}`, {
      params: { ...params },
      observe: "response",
    });
  }
  /* ---------------------- PUT Method ----------------------- */
  PUT<T>(url, body, params?) {
    return this.httpClient.put<T>(`${environment.baseUrl}${url}`, body, {
      params: { ...params },
      observe: "response",
    });
  }

  PATCH<T>(url, body, params?) {
    return this.httpClient.patch<T>(`${environment.baseUrl}${url}`, body, {
      params: { ...params },
      observe: "response",
    });
  }
}
