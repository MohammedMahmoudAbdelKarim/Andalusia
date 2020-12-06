import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AnimationOptions } from "ngx-lottie";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.component.html",
  styleUrls: ["./splash.component.scss"],
})
export class SplashComponent implements OnInit {
  modalRef: BsModalRef;
  @ViewChild("splash", { static: true }) splash;

  options: AnimationOptions = {
    path: "https://assets9.lottiefiles.com/private_files/lf30_oGbdoA.json",
  };

  constructor(private modalService: BsModalService) {}

  ngOnInit() {
    this.openModal(this.splash);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass("modal-lg");
  }

  hideModal() {
    this.modalRef.hide();
  }
}
