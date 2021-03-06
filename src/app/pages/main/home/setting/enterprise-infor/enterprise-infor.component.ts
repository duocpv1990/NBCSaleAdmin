import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
// import { ProductAddComponent } from '../../../product/product-add/product-add.component';
import { ProductDeleteComponent } from '../../../product/product-delete/product-delete.component';
import { ProductUpdateComponent } from '../../../product/product-update/product-update.component';

@Component({
  selector: 'app-enterprise-infor',
  templateUrl: './enterprise-infor.component.html',
  styleUrls: ['./enterprise-infor.component.scss']
})
export class EnterpriseInforComponent implements OnInit {
  listFilter;
  config = new Product();
  value: string;
  dataSub = [];
  tableData = [];
  listActive;
  dataTable;
  data = [
    {
      image: 'https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg',
      productName: 'Bút bi Thiên Long',
      barcode: '123456789',
      contractPackage: 'Gói cơ bản',
      owner: 'Công ty TNHH Việt An',
      authorization: {
        name: 'DNSH-NSX',
        type: 'Toàn quyền'
      },
      status: 'Cho quét',
      infoStatus: 'Đã duyệt',
      scanCount: 6
    },
    {
      image: 'https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg',
      productName: 'Bút bi Thiên Long',
      barcode: '123456789',
      contractPackage: 'Gói cơ bản',
      owner: 'Công ty TNHH Việt An',
      authorization: {
        name: 'DNSH-NSX',
        type: 'Toàn quyền'
      },
      status: 'Cho quét',
      infoStatus: 'Đã duyệt',
      scanCount: 6
    },
    {
      image: 'https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg',
      productName: 'Bút bi Thiên Long',
      barcode: '123456789',
      contractPackage: 'Gói cơ bản',
      owner: 'Công ty TNHH Việt An',
      authorization: {
        name: 'DNSH-NSX',
        type: 'Toàn quyền'
      },
      status: 'Cho quét',
      infoStatus: 'Đã duyệt',
      scanCount: 6
    },
    {
      image: 'https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg',
      productName: 'Bút bi Thiên Long',
      barcode: '123456789',
      contractPackage: 'Gói cơ bản',
      owner: 'Công ty TNHH Việt An',
      authorization: {
        name: 'DNSH-NSX',
        type: 'Toàn quyền'
      },
      status: 'Cho quét',
      infoStatus: 'Đã duyệt',
      scanCount: 6
    },
    {
      image: 'https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg',
      productName: 'Bút bi Thiên Long',
      barcode: '123456789',
      contractPackage: 'Gói cơ bản',
      owner: 'Công ty TNHH Việt An',
      authorization: {
        name: 'DNSH-NSX',
        type: 'Toàn quyền'
      },
      status: 'Cho quét',
      infoStatus: 'Đã duyệt',
      scanCount: 6
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
      return this.dialog.open(ProductUpdateComponent, {
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
