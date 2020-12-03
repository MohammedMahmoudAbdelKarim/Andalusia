import { CommonFunctionsService } from "src/app/shared/services/commonFunctions.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../interfaces/productInterface";
import { Duration } from "../enums/enums.enum";
import { Locale } from "../interfaces/localeInterface";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class DataShareService {
  constructor(
    private cf: CommonFunctionsService,
    private cookieService: CookieService
  ) {}

  localeSubject = new BehaviorSubject<Locale>({ dir: "", lang: "" });
  public locale$: Observable<Locale> = this.localeSubject.asObservable();

  loaderSubject = new BehaviorSubject(false);
  public loader$ = this.loaderSubject.asObservable();

  userSubject = new BehaviorSubject(null);
  public user$ = this.userSubject.asObservable();

  cartProductsSubject = new BehaviorSubject<Product[]>([]);
  public cartProducts$ = this.cartProductsSubject.asObservable();

  cartQuantitySubject = new BehaviorSubject<number>(0);
  public cartQuantity$ = this.cartQuantitySubject.asObservable();

  orderTotalAmountSubject = new BehaviorSubject<number>(0);
  public orderTotalAmount$ = this.orderTotalAmountSubject.asObservable();

  serverErrorsSubject = new BehaviorSubject(null);
  public serverErrors$ = this.serverErrorsSubject.asObservable();

  showSplashSubject = new BehaviorSubject(false);
  public showSplash$ = this.showSplashSubject.asObservable();

  // Init all date
  InitData() {
    this.initSplash();
    this.initUser();
    this.initCartProducts();
    this.initLocale();
    this.updateTotalOrderAmount();
  }
  // Language and Directions
  initLocale() {
    const exsistLocale: Locale = this.cf.getLocalItem("locale");
    if (exsistLocale) {
      this.localeSubject.next(exsistLocale);
    } else {
      const locale = this.cf.getUserLocale();
      this.localeSubject.next(locale);
    }
  }

  changeAppLanguage(lang) {
    this.localeSubject.next({ lang, dir: lang === "ar" ? "rtl" : "ltr" });
    this.cf.setLocalItem("locale", this.localeSubject.value, Duration.year);
  }

  // Loader
  enableLoader() {
    this.loaderSubject.next(true);
  }
  disableLoader() {
    this.loaderSubject.next(false);
  }

  // Cart
  initCartProducts() {
    const localHostProducts = this.cf.getLocalItem("cartProducts");
    const localCartQuantity = this.cf.getLocalItem("cartQuantity");
    if (localHostProducts && localCartQuantity) {
      this.cartProductsSubject.next(localHostProducts);
      this.cartQuantitySubject.next(localCartQuantity);
    } else {
      this.cartProductsSubject.next([]);
      this.cartQuantitySubject.next(0);
    }
  }

  addToCart(p: Product) {
    const currentProducts = this.cartProductsSubject.value;
    const exsist = currentProducts.find((ele) => ele.id === p.id);
    if (exsist) {
      exsist.quantity++;
      exsist.totalProductsPrice = exsist.quantity * exsist.finalPrice;
    } else {
      currentProducts.push(p);
    }
    this.incCartQunatity();
    this.setProductsToLocalItem(currentProducts);
    this.cartProductsSubject.next(this.getProducts());
    this.updateTotalOrderAmount();
  }

  removeFromCart(p: Product) {
    let currentProducts = this.cartProductsSubject.value;
    const exsist = currentProducts.find((ele) => ele.id === p.id);

    if (exsist.quantity > 1) {
      exsist.quantity--;
    } else {
      currentProducts = currentProducts.filter((ele) => ele !== p);
    }
    this.decCartQunatity();
    this.setProductsToLocalItem(currentProducts);
    this.cartProductsSubject.next(this.getProducts());
    this.updateTotalOrderAmount();
  }
  /**
   * removing the whole product and it's quantity from cart
   * @param product the whole product to be removed with it's quantity
   */
  deleteProduct(product: Product) {
    let currentProducts = this.cartProductsSubject.value;
    currentProducts = currentProducts.filter((p) => p.id !== product.id);
    this.decCartQunatity(product.quantity);
    this.setProductsToLocalItem(currentProducts);
    this.cartProductsSubject.next(this.getProducts());
    this.updateTotalOrderAmount();
  }

  getProducts(): Product[] {
    return this.cf.getLocalItem("cartProducts");
  }

  /**
   * adding products to local host with a new key (totalProductsPrice) to calculate total price per quantity
   * @param products products added to the cart
   */
  setProductsToLocalItem(products: Product[]) {
    products.map((p) => (p.totalProductsPrice = p.quantity * p.finalPrice));
    this.cf.setLocalItem("cartProducts", products, Duration.week);
  }

  updateTotalOrderAmount() {
    const products: Product[] = this.getProducts();
    if (products) {
      let orderTotalAmount = 0;
      products.map((p) => (orderTotalAmount += p.totalProductsPrice));
      this.orderTotalAmountSubject.next(orderTotalAmount);
    } else {
      this.orderTotalAmountSubject.next(0);
    }
  }

  // Cart Quantity
  incCartQunatity() {
    let currentQuantity = this.cartQuantitySubject.value;
    currentQuantity++;
    this.cf.setLocalItem("cartQuantity", currentQuantity, Duration.week);
    this.cartQuantitySubject.next(this.cf.getLocalItem("cartQuantity"));
  }
  decCartQunatity(quantity?: number) {
    let currentQuantity = this.cartQuantitySubject.value;
    if (currentQuantity !== 0) {
      if (quantity) {
        currentQuantity -= quantity;
      } else {
        currentQuantity--;
      }
    }
    this.cf.setLocalItem("cartQuantity", currentQuantity, Duration.week);
    this.cartQuantitySubject.next(this.cf.getLocalItem("cartQuantity"));
  }

  // Server Errors
  addServerErrors(errors) {
    this.serverErrorsSubject.next(errors);
  }

  clearServerErrors() {
    // remove server errors in every ng on init form component
    this.serverErrorsSubject.next(null);
  }

  // User
  initUser() {
    this.userSubject.next(this.getUser());
  }

  getUser() {
    const user = this.cf.parseJwt(this.cf.getCookie("jwt"));
    return user ? user : null;
  }

  saveUser(key, value) {
    this.cookieService.set(key, value);
    this.userSubject.next(this.getUser());
  }

  removeUser() {
    this.userSubject.next(null);
    this.cf.deleteCookie("jwt");
  }

  // Spalsh
  initSplash() {
    if (!this.cf.getLocalItem("visited")) {
      this.showSplash();
    }
    this.cf.setLocalItem("visited", "true", Duration.month);
  }

  showSplash() {
    this.showSplashSubject.next(true);
  }
  hideSplash() {
    this.showSplashSubject.next(false);
  }
}
