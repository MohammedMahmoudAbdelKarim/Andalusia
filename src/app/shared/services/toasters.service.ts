import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class ToastersService {
  constructor(private toastr: ToastrService) {}

  Success(message, options?: Options) {
    this.toastr.success(message, null, options);
  }
  Error(message, options?: Options) {
    this.toastr.error(message, null, options);
  }
  Info(message, options?: Options) {
    this.toastr.info(message, null, options);
  }
  Warning(message, options?: Options) {
    this.toastr.warning(message, null, options);
  }
}

interface Options {
  /**
   * disable both timeOut and extendedTimeOut
   * default: false
   */
  disableTimeOut?: boolean;
  /**
   * toast time to live in milliseconds
   * default: 5000
   */
  timeOut?: number;
  /**
   * toast show close button
   * default: false
   */
  closeButton?: boolean;
  /**
   * time to close after a user hovers over toast
   * default: 1000
   */
  extendedTimeOut?: number;
  /**
   * show toast progress bar
   * default: false
   */
  progressBar?: boolean;
  /**
   * changes toast progress bar animation
   * default: decreasing
   */
  progressAnimation?: "decreasing" | "increasing";
  /**
   * render html in toast message (possibly unsafe)
   * default: false
   */
  enableHtml?: boolean;
  /**
   * css class on toast component
   * default: ngx-toastr
   */
  toastClass?: string;
  /**
   * css class on toast container
   * default: toast-top-right
   */
  positionClass?: string;
  /**
   * css class on toast title
   * default: toast-title
   */
  titleClass?: string;
  /**
   * css class on toast message
   * default: toast-message
   */
  messageClass?: string;
  /**
   * animation easing on toast
   * default: ease-in
   */
  easing?: string;
  /**
   * animation ease time on toast
   * default: 300
   */
  easeTime?: string | number;
  /**
   * clicking on toast dismisses it
   * default: true
   */
  tapToDismiss?: boolean;
  /**
   * Helps show toast from a websocket or from event outside Angular
   * default: false
   */
  onActivateTick?: boolean;
}
