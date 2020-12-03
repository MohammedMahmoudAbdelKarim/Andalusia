import { CookieService } from "ngx-cookie-service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadCrumbComponent } from "./components/breadCrumb/breadCrumb.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { ProductModalComponent } from "./components/productModal/productModal.component";
import { TapToTopComponent } from "./components/tapToTop/tapToTop.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SplashComponent } from "./components/splash/splash.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { RouterModule } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NotFoundComponent } from "./components/notFound/notFound.component";
import { MatMenuModule } from "@angular/material/menu";
import { ProgressBarComponent } from "./components/progressBar/progressBar.component";
import { CounterComponent } from "./components/counter/counter.component";
import { ScrollCountToDirective } from "./components/counter/scrollCountTo.directive";
import { TranslateModule } from "@ngx-translate/core";
import { LottieModule } from "ngx-lottie";
import { TermsAndConditionsComponent } from "./components/termsAndConditions/termsAndConditions.component";
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  entryComponents: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RouterModule,
    MatProgressBarModule,
    MatMenuModule,
    FormsModule,
    TranslateModule.forChild(),
    LottieModule,
    MatDialogModule,
  ],
  declarations: [
    BreadCrumbComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    ProductModalComponent,
    TapToTopComponent,
    SplashComponent,
    ProgressBarComponent,
    NotFoundComponent,
    CounterComponent,
    ScrollCountToDirective,
    TermsAndConditionsComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // components
    BreadCrumbComponent,
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    ProductModalComponent,
    TapToTopComponent,
    SplashComponent,
    ProgressBarComponent,
    NotFoundComponent,
    CounterComponent,
    TermsAndConditionsComponent,
    ScrollCountToDirective,
    TranslateModule,
    MatDialogModule,
  ],
  providers: [CookieService],
})
export class SharedModule {}
