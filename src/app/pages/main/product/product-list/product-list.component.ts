import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  dataFilterCard = [
    {
      type: {
        Id: 'id',
        Phone: 'phone',
        startDate: 'startDate',
        endDate: 'endDate',
        Status: 'status',
      },
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
