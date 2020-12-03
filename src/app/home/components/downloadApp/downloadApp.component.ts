import { ToastersService } from "./../../../shared/services/toasters.service";
import { APIsService } from "./../../../shared/services/apis.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Locale } from 'src/app/shared/interfaces/localeInterface';
import { DataShareService } from 'src/app/shared/services/dataShare.service';

@Component({
  selector: "app-downloadApp",
  templateUrl: "./downloadApp.component.html",
  styleUrls: ["./downloadApp.component.scss"],
})
export class DownloadAppComponent implements OnInit {
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );

  constructor(private api: APIsService, private toasters: ToastersService, private dataShare: DataShareService) { }

  ngOnInit() { }
  // Download APK
  downloadAPK() {
    this.api
      .GET("apk/download")
      .subscribe((apk) => {
        this.toasters.Success("Downloaded Successfully!");
      });
  }
}
