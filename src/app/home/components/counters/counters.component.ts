import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { DataShareService } from "src/app/shared/services/dataShare.service";

@Component({
  selector: "app-counters",
  templateUrl: "./counters.component.html",
  styleUrls: ["./counters.component.scss"],
})
export class CountersComponent implements OnInit {
  count = {
    countTo: 100,
    from: 0,
    duration: 1,
  };
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  constructor(private dataShare: DataShareService) {}

  ngOnInit() {
    this.initCounters();
  }

  initCounters() {
    let a = 0;
    $(window).scroll(() => {
      if ($("#counter").offset()) {
        const oTop = $("#counter").offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
          $(".counter-value").each(function () {
            let $this = $(this),
              countTo = $this.attr("data-count");
            $({
              countNum: $this.text(),
            }).animate(
              {
                countNum: countTo,
              },
              {
                duration: 4000,
                easing: "swing",
                step() {
                  $this.text(Math.floor(this.countNum));
                },
                complete() {
                  $this.text(this.countNum);
                },
              }
            );
          });
          a = 1;
        }
      }
    });
  }
}
