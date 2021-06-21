import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductService } from 'src/app/services/product.service';
import { FormatDateService } from 'src/app/services/format-date.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  listFilter;
  config = new Product();
  value: string;
  dataSub = [];
  // tableData = [];
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

  constructor(
    private dialog: MatDialog,
    private productService: ProductService,
    private serviceDate: FormatDateService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    // this.dataSub = this.data;
  }

  getListProduct(pageCurrent: number): void {
    this.productService.getProduct(pageCurrent, 5).subscribe((res) => {
      console.log(res);
      this.data = res.map((x, index) => {
        return {
          image: x.MediaURL,
          productName: x.Name,
          barcode: x.ProductCode,
          scanCount: x.ScanNumber,
          distributor: x.Name,
          status: (x.Type === 1) ? 'Đã duyệt' : 'Chưa duyệt',
          phone: x.PhoneNumber,
          area: "Hà Nội",
          address: x.AddressDetail,
          gt: x.ProductNumber + ' giấy tờ',
          MediaURL: x.MediaURL,
          production: x.ProductNumber,
          update: (x.UpdatedOn !== null) ? this.serviceDate.formatDate(x.UpdatedOn, 'hh:mm MM/DD/YYYY') : ''
        };
      });
      this.dataSub = this.data;

    },
      (err) => {
        console.log(err);
      });
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
