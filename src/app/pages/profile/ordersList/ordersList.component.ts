import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { OrderHistory } from "./../../../shared/interfaces/orderHistoryInterface";

@Component({
  selector: "app-ordersList",
  templateUrl: "./ordersList.component.html",
  styleUrls: ["./ordersList.component.scss"],
})
export class OrdersListComponent implements OnInit {
  @Input() orderHistory: OrderHistory[];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "orderName",
    "date",
    "price",
    "status",
    "actions",
  ];
  constructor() {}

  ngOnInit() {
    if (this.orderHistory) {
      this.dataSource = new MatTableDataSource(this.orderHistory);
      this.dataSource.paginator = this.paginator;
    }
  }
}
