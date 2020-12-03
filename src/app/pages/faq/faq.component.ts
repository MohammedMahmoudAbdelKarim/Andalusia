import { Component, OnInit } from "@angular/core";
import { AnimationOptions } from "ngx-lottie";
import { DataShareService } from "src/app/shared/services/dataShare.service";
import { Locale } from "./../../shared/interfaces/localeInterface";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"],
})
export class FaqComponent implements OnInit {
  // FAQs
  questions: any[] = [
    {
      question: "Lorem ipsum dolor si adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur",
      status: false,
    },
    {
      question: "Lorem ipsum sit amet consectetur adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime! soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime!",
      status: false,
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore voluptatibus unde mollitia repudiandae, soluta modi?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime! aliquid. Recusandae iusto nesciunt a esse maxime",
      status: false,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime!",
      status: false,
    },
    {
      question: "Lorem  sit amet adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt. Recusandae iusto nesciunt a esse maxime",
      status: false,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime!",
      status: false,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur ?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo",
      status: false,
    },
    {
      question: "Lorem ipsum  sit amet  adipisicing elit?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime! ipsum dolor sit amet consectetur adipisicing elit. Non, fuga, temporibus repellendus quis similique quo consectetur soluta magnam quisquam itaque est, animi officiis aliquid. Recusandae iusto nesciunt a esse maxime!",
      status: false,
    },
  ];

  options: AnimationOptions = {
    path: "assets/animations/faqs.json",
  };

  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  constructor(private dataShare: DataShareService) {}

  ngOnInit() {}

  toggle(question) {
    question.status = !question.status;

    this.questions.map((q) => {
      if (q !== question) {
        q.status = false;
      }
    });
  }
}
