import { browser } from "protractor";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class CommonFunctionsService {
  constructor(private cookieService: CookieService) {}

  public toFormData(obj: object) {
    const formBody: FormData = new FormData();

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        formBody.append(key, obj[key]);
      }
    }

    return formBody;
  }

  /* -------------------- Save Token in Cookies --------------------- */
  public setCookie(name, value) {
    this.cookieService.set(name, value);
  }

  /* -------------------- Get Cookie --------------------- */
  public getCookie(name) {
    return this.cookieService.get(name) ? this.cookieService.get(name) : null;
  }

  /* -------------------- Delete Cookie --------------------- */
  public deleteCookie(name) {
    this.cookieService.delete(name);
  }

  /* -------------- JWT Parser function ------------------- */
  /**
   * decode JWT Token
   * @param token a JWT Token
   */
  public parseJwt(token) {
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    }
  }

  /**
   *
   * @param key Local Storage Key
   * @param value Local Storage Value (String)
   * @param ttl Time to live (Expiry Date in MS)
   */
  setLocalItem(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  /**
   *
   * @param key Local Storage Key
   */
  getLocalItem(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }

  getUserLanguage() {
    return navigator.language.slice(0, 2);
  }

  getUserDirection() {
    const lang = this.getUserLanguage();
    return lang === "ar" ? "rtl" : "ltr";
  }

  getUserLocale() {
    return { lang: this.getUserLanguage(), dir: this.getUserDirection() };
  }
}
