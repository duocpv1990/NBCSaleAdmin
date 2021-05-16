import { Component, OnInit } from '@angular/core';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { EnterpriseEditComponent } from '../../enterprise/enterprise-edit/enterprise-edit.component';

@Component({
  selector: 'app-home-product',
  templateUrl: './home-product.component.html',
  styleUrls: ['./home-product.component.scss']
})
export class HomeProductComponent implements OnInit {

  config = new EnterPriseModel();
  listFilter = [];
  data = [
    {
      "stt": "1",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 1',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "2",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 2 ',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "3",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 3',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "4",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 4',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "5",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 5',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },
    {
      "stt": "6",
      "code": "023456781",
      "global": '023456781',
      "register": 'Công ty TNHH Việt An 6',
      "gt": '1 giấy tờ',
      "status": "Đã duyệt",
      "update": "13:30, 21/04/2021",
      "taxcode": "01234",
      "country": "Viet Nam",
      "city": "1",
      "district": "1",
      "address": "Ha Noi - Viet Nam",
      "phone": "0987654321",
      "email": "city@gmail.com",
      "website": "https://www.consultindochina.com/"
    },


  ];
  dataTable;
  listActive;
  dataSub;
  constructor(

  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
  }
  handleCallback(ev) {
    const filter = this.listFilter.filter(x => x.value);
    if (!filter.length) return this.dataSub = this.data;
    filter.forEach((x, ix) => {
      if (ix === 0) {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.data.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.data.filter((a) => a[x.condition] == x.value);
        }
      } else {
        if (x.type === 'text' || x.type === 'search') {
          this.dataSub = this.dataSub.filter(
            (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
        } else {
          this.dataSub = this.dataSub.filter((a) => a[x.condition] == x.value);
        }
      }

    });
  }
  handleCallbackTable(ev) {


  }

}
