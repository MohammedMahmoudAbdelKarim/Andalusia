import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Locale } from "src/app/shared/interfaces/localeInterface";
import { DataShareService } from "src/app/shared/services/dataShare.service";

@Component({
  selector: "app-officers",
  templateUrl: "./officers.component.html",
})
export class OfficersComponent implements OnInit {
  selectedOfficer: any = {
    name: "Hazem Darwiesh",
    img: "../../../../assets/imgs/ceo.png",
    title: "Chief Executive Officer",
  };
  officers: any[] = [
    {
      name: "Mr. Mohamed AbdelRasoul",
      img: "../../../../assets/imgs/c1.png",
    },
    {
      name: "Dr. Alaa AlGoweini",
      img: "../../../../assets/imgs/c2.png",
    },
    {
      name: "Dr. Walaa Kadry",
      img: "../../../../assets/imgs/c3.png",
    },
    {
      name: "Mr. AbdelHakim GamalElDin",
      img: "../../../../assets/imgs/c4.png",
      title: "Chief Executive Officer",
    },
  ];
  // Get Direction
  direction$: Observable<string> = this.dataShare.locale$.pipe(
    map((locale: Locale) => locale.dir)
  );
  constructor(private dataShare: DataShareService) {}

  ngOnInit() {}

  // Get the selected Officer
  selectOfficerfunction(officer) {
    this.selectedOfficer = {
      name: officer.name,
      img: officer.img,
      title: officer.title ? officer.title : null,
    };
    console.log(this.officers.includes(officer));
    let index = this.officers.indexOf(officer);
    console.log(index);
  }
}
