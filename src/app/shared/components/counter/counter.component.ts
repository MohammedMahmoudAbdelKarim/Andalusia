import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-counter",
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
})
export class CounterComponent implements OnInit {
  // the span element
  // @ViewChild("counter", { static: true }) counter: ElementRef;
  @ViewChild("counterContainer", { static: true }) counterContainer: ElementRef;

  @Input() countTo: number = 3000;
  @Input() countFrom: number = 0;
  @Input() countSpeed: number = 1000;
  @Input() dely: number = 500;

  constructor() {}

  ngOnInit() {
    this.startCounter();
  }

  updateCount() {
    const incBy = Math.ceil(this.countTo / this.countSpeed);

    if (this.countFrom < this.countTo) {
      this.countFrom = this.countFrom + incBy;
      setTimeout(() => {
        this.updateCount();
      }, 1);
    }
  }

  startCounter() {
    window.onscroll = () => {
      const elemTop =
        this.counterContainer.nativeElement.offsetTop - window.innerHeight;

      if (window.scrollY > elemTop) {
        setTimeout(() => {
          this.updateCount();
        }, this.dely);
      }
    };
  }
}
