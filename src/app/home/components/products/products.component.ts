import { Component, OnInit } from "@angular/core";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { APIsService } from "./../../../shared/services/apis.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "src/app/shared/interfaces/productInterface";
import { ToastersService } from "./../../../shared/services/toasters.service";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { ServerResponse } from "./../../../shared/interfaces/serverResponseInterface";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  isAdded = false;
  carouselOptions: any = {};
  products$: Observable<Product[]> = this.getProducts();
  responsiveWithParts = {
    0: { items: 1.2 },
    425: { items: 1.2 },
    768: { items: 2.2 },
    1024: { items: 3.2 },
  };
  responsive = {
    0: { items: 1.2 },
    425: { items: 1.2 },
    768: { items: 2.2 },
    1024: { items: 3 },
  };
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );

  constructor(
    private dataShare: DataShareService,
    private api: APIsService,
    private toasters: ToastersService
  ) {}

  ngOnInit() {
    this.initOwlCarosel();
  }

  initOwlCarosel() {
    this.carouselOptions = {
      margin: 5,
      loop: true,
      nav: true,
      responsiveClass: true,
      responsive: this.responsive,
    };
  }

  addToCart(p: Product) {
    this.dataShare.addToCart(p);
    this.toasters.Success("Product Added!", {
      timeOut: 2000,
    });
  }

  getProducts() {
    const params = { expand: "features" };
    return this.api.GET("products", params).pipe(
      map((res: HttpResponse<ServerResponse>) => {
        res.body.data.map((p) => (p.quantity = 1));
        // Displaying part of a product in case the products number is more than 3 items
        if (res.body.data.length > 3) {
          this.carouselOptions.responsive = this.responsiveWithParts;
        }
        return res.body.data;
      })
    );
  }
}
