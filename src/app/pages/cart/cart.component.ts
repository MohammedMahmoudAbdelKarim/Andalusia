import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Product } from "../../shared/interfaces/productInterface";
import { ToastersService } from "src/app/shared/services/toasters.service";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { APIsService } from "src/app/shared/services/apis.service";
import { Order, PaySkyConfig } from "../../shared/interfaces/orderInterface";
import { ServerResponse } from "./../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";
import { HandleErrorService } from "src/app/shared/services/handleError.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  orderTotalAmount$: Observable<number> = this.dataShare.orderTotalAmount$;
  products$: Observable<Product[]> = this.dataShare.cartProducts$;
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );

  showValidationError = this.handleError.showValidationError;
  getFormValidationMessage = this.handleError.getFormValidationMessage;
  serverErrors$: Observable<any> = this.dataShare.serverErrors$;
  couponForm: FormGroup;

  constructor(
    private dataShare: DataShareService,
    private toasters: ToastersService,
    private api: APIsService,
    private handleError: HandleErrorService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.dataShare.clearServerErrors();
    this.initCouponForm();
    // this.checkout();
  }

  initCouponForm() {
    this.couponForm = this.fb.group({
      coupon: [""],
    });
  }

  removeFromCart(p) {
    this.dataShare.removeFromCart(p);
  }
  addToCart(p) {
    this.dataShare.addToCart(p);
  }
  deleteProduct(p) {
    this.dataShare.deleteProduct(p);
  }

  // checkout() {
  //   const products: Product[] = this.dataShare.getProducts();
  //   const order: Order = {
  //     cart: [],
  //     coupon: null,
  //   };

  //   products.map((product) => {
  //     order.cart.push({ product_id: product.id, quantity: product.quantity });
  //   });

  //   // getting order details from server [for security wise]
  //   this.api
  //     .POST("orders/checkout", order)
  //     .subscribe((res: HttpResponse<ServerResponse>) =>
  //       console.log({ totalOrderAmount: res.body.data.amount })
  //     );
  // }

  placeOrder() {
    const products: Product[] = this.dataShare.getProducts();
    const order: Order = {
      cart: [],
      coupon: null,
    };
    const cpoupon = this.couponForm.get("coupon").value;
    if (cpoupon) {
      order.coupon = cpoupon;
    }

    products.map((product) => {
      order.cart.push({ product_id: product.id, quantity: product.quantity });
    });

    this.api
      .POST("orders/place-order", order)
      .subscribe((res: HttpResponse<any>) => {
        const {
          MID,
          TID,
          SecureHash,
          MerchantReference,
          AmountTrxn,
          currency,
          CustomerMobile,
          orderId,
        } = res.body.data;

        const paySkyConfig: PaySkyConfig = {
          MID,
          TID,
          MerchantReference,
          AmountTrxn,
          currency,
          SecureHash,
          CustomerMobile,
          orderId,
        };
        this.paySkyConfig({ ...paySkyConfig });
        window["Lightbox"].Checkout.showLightbox();
      });
  }

  paySkyConfig(config: PaySkyConfig) {
    window["Lightbox"].Checkout.configure = {
      MID: config.MID,
      TID: config.TID,
      AmountTrxn: config.AmountTrxn,
      MerchantReference: config.MerchantReference,
      CustomerMobile: config.CustomerMobile,
      SecureHash: config.SecureHash,
      completeCallback: (data) => {
        checkoutComplete(data);
      },
      errorCallback: (error) => {
        checkoutError(error);
      },
      cancelCallback: () => {
        checkoutCancel(config.orderId);
      },
    };

    const checkoutComplete = (data) => {
      console.log("Success!", data);
      this.toasters.Success("Purchase Succeed!");
    };
    const checkoutError = (error) => {
      console.log("Error!", error);
      this.toasters.Error("Purchase Error!");
    };
    const checkoutCancel = (orderId) => {
      this.api.DELETE(`orders/${orderId}`).subscribe(() => {
        this.toasters.Warning("Purchase Cancelled!");
      });
    };
  }
}
