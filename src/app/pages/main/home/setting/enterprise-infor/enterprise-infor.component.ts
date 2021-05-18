import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentModel } from 'src/app/models/document.model';
import { ProductAddComponent } from '../../../product/product-add/product-add.component';
import { ProductDeleteComponent } from '../../../product/product-delete/product-delete.component';
import { ProductUpdateComponent } from '../../../product/product-update/product-update.component';


@Component({
  selector: 'app-enterprise-infor',
  templateUrl: './enterprise-infor.component.html',
  styleUrls: ['./enterprise-infor.component.scss']
})
export class EnterpriseInforComponent implements OnInit {
  listFilter;
  config = new DocumentModel();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [
    {
      stt: 1,
      documentName: 'Giấy đăng ký kinh doanh',
      expiredDate: '13:30, 21/04/2021',
      condition: '',
      file: ''
    }
  ];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.tableData = this.config.collums;
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
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(ProductAddComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'edit') {
      return this.dialog.open(ProductUpdateComponent, {
        width: '940px',
        height: '843px',
        data: ev.item
      }).afterClosed().subscribe(result => {
      });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(ProductDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item,
          title: "Xoá sản phẩm",
          content: "Bạn có muốn xoá sản phẩm trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
      });
    }
  }

}
