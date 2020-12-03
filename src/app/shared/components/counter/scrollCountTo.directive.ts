import { Directive } from "@angular/core";

@Directive({
  selector: "[ScrollCountTo]",
})
export class ScrollCountToDirective {
  constructor() {}

  elements: HTMLElement[] = Array.from(document.querySelectorAll(".counter"));

  ngOnInit() {
    this.startCounter();
  }

  updateCount(ele, to, from, speed) {
    const incBy = Math.ceil(to / speed);

    if (from < to) {
      from += incBy;
      ele.innerText = from;
      setTimeout(() => {
        this.updateCount(ele, to, from, speed);
      }, 1);
    }
  }

  startCounter() {
    window.onscroll = () => {
      this.elements.map((ele) => {
        let countTo = ele.attributes["data-countTo"].value;
        let countFrom = ele.attributes["data-countFrom"].value;
        let countSpeed = ele.attributes["data-countSpeed"].value;
        let countDely = ele.attributes["data-countDely"].value;

        const elemTop = ele.offsetTop - window.innerHeight;
        if (window.scrollY > elemTop) {
          console.log("Appeared");
          setTimeout(() => {
            this.updateCount(ele, +countTo, +countFrom, +countSpeed);
          }, +countDely);
        }
      });
    };
  }
}
