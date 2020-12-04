import { CookieService } from "ngx-cookie-service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { TapToTopComponent } from "./components/tapToTop/tapToTop.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SplashComponent } from "./components/splash/splash.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { RouterModule } from "@angular/router";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { NotFoundComponent } from "./components/notFound/notFound.component";
import { MatMenuModule } from "@angular/material/menu";
import { ProgressBarComponent } from "./components/progressBar/progressBar.component";
import { TranslateModule } from "@ngx-translate/core";
import { LottieModule } from "ngx-lottie";
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  entryComponents: [],
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
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    TapToTopComponent,
    SplashComponent,
    ProgressBarComponent,
    NotFoundComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // components
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    TapToTopComponent,
    SplashComponent,
    ProgressBarComponent,
    NotFoundComponent,
    TranslateModule,
    MatDialogModule,
  ],
  providers: [],
})
export class SharedModule {}
