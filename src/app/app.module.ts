import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AuthGuard } from "./shared/guards/auth.guard";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { APIsService } from "./shared/services/apis.service";
import { interceptorProviders } from "./shared/interceptors/interceptorProviders";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-left",
      progressBar: true,
      closeButton: true,
      enableHtml: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [AuthGuard, APIsService, interceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
