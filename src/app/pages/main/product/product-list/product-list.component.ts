import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductUpdateComponent } from '../product-update/product-update.component';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { ProductService } from 'src/app/services/product.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';

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
  currrentPage = 1;
  listActive;
  dataTable;
  dataLength = 0;
  data = [];

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
    this.getListProduct('', '', '', 1);
  }

  getListProduct(name: string, companyName: string, productCode: string, pageCurrent: number, status?: number, type?: number): void {
    this.productService.getProduct(name ? name : '', companyName ? companyName : '', productCode ? productCode : '',
      pageCurrent, 5, status ? status : '', type ? type : '').subscribe((res) => {
        this.dataLength = res.count;
        this.data = res.payload.map((x, index) => {
          return {
            stt: index + 1,
            image: x.MediaURL,
            productId: x.ProductId,
            productName: x.Name,
            barcode: x.ProductCode,
            scanCount: x.ScanNumber,
            rateCount: x.RatingNumber,
            scanStatus: 0,
            price: x.Price,
            type: x.Type,
            status: (x.Status === 2) ? 'Hoạt động' : 'Không hoạt động',
            checkbox: false
          };
        });
        this.dataSub = this.data;

      },
        (err) => {
          console.log(err);
        });
  }

  handleCallback(): void {
    this.getListProduct(
      this.listFilter.find(x => x.condition === 'name')?.value,
      this.listFilter.find(x => x.condition === 'companyName')?.value,
      this.listFilter.find(x => x.condition === 'productCode')?.value,
      1,
      this.listFilter.find(x => x.condition === 'status')?.value,
      this.listFilter.find(x => x.condition === 'type')?.value,
    );
  }

  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(ProductUpdateComponent, {
        width: '940px',
        height: '843px',
        data: {
          ProductCertifications: [],
          DistributorProducts: []
        }
      }).afterClosed().subscribe(result => {
      });
    } else if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px'
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
    if (ev.type === 'edit') {
      // this.productService.getProductDetail(ev.item.productId).subscribe((res) => {})
      this.productService.getProductDetail(ev.item.productId).subscribe((res) => {
        // console.log(res);
        // const itme = {
        //   barcode: res.ProductCode,
        //   productName: res.Name,
        //   price: res.Price,
        //   category: res.Category,
        //   productDetail: res.Ingredient
        // };
        // const item = {
        // companyId: ev.item.companyId,
        // code: res.CompanyCode,
        // global: res.GLN,
        // register: res.Name,
        // status: (res.Status === 1) ? 'Đã duyệt' : 'Chưa duyệt',
        // gt: res.CertificateNumber + ' giấy tờ',
        // update: (res.UpdatedOn !== null) ? this.serviceDate.formatDate(res.UpdatedOn, 'hh:mm MM/DD/YYYY') : '',
        // address: res.AddressDetail,
        // taxcode: res.TaxCode,
        // website: res.Website,
        // phone: res.PhoneNumber,
        // email: res.Email,
        // country: res.NationId,
        // city: res.ProvinceId,
        // district: res.DistrictId,
        // MediaURL: res.CompanyMedias.find(x => x.Type === 1 && x.Status === 1)?.MediaURL,
        // BackgroundURL: res.CompanyMedias.find(x => x.Type === 2 && x.Status === 1)?.MediaURL,
        // certifi: []
        //   };
        //   if (res.CompanyCertifications && res.CompanyCertifications.length !== 0) {
        //     item.certifi = res.CompanyCertifications.map(cer => {
        //       return {
        //         name: cer.Name,
        //         status: cer.Status,
        //         date: (cer.ExpiredDate !== null) ? this.serviceDate.formatDate(cer.ExpiredDate, 'MM/DD/YYYY') : '',
        //         image: cer.CertificationMedias.map(media => {
        //           return {
        //             str: media.MediaURL.substring(media.MediaURL.lastIndexOf('/') + 1),
        //             url: media.MediaURL
        //           };
        //         }),
        //       };
        //     });
        //   }
          return this.dialog.open(ProductUpdateComponent, {
            width: '940px',
            height: '843px',
            data: res,
          }).afterClosed().subscribe(result => {
          });

        // },
        //   (err) => {
        //     console.log(err);
        //   });
      });
      // return this.dialog.open(ProductUpdateComponent, {
      //       width: '940px',
      //     height: '843px',
      //     data: ev.item
      //   }).afterClosed().subscribe(result => {
      //   });

      //   return this.dialog.open(ProductUpdateComponent, {
      //     width: '940px',
      //     height: '843px',
      //     data: ev.item
      //   }).afterClosed().subscribe(result => {
      //   });
      // }}
    }
    if (ev.type === 'delete') {
      return this.dialog.open(ProductDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item.productId,
          title: "Xoá sản phẩm",
          content: "Bạn có muốn xoá sản phẩm trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.ngOnInit();
        }
      });
    } else if (ev.type === 'deleteAll') {
      if (ev.data.length !== 0 ) {
        return this.dialog.open(ProductDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.data.map(x => {
              return x.productId;
            }),
            title: "Xoá sản phẩm",
            content: "Bạn có muốn xoá sản phẩm trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {
          if (result === true) {
            this.getListProduct(
              this.listFilter.find(x => x.condition === 'name')?.value,
              this.listFilter.find(x => x.condition === 'companyName')?.value,
              this.listFilter.find(x => x.condition === 'productCode')?.value,
              this.currrentPage,
              this.listFilter.find(x => x.condition === 'status')?.value,
              this.listFilter.find(x => x.condition === 'type')?.value,
            );
          }
        });
      }
    }
    else if (ev.type === 'page') {
      this.currrentPage = +ev.item;
      this.getListProduct(
        this.listFilter.find(x => x.condition === 'name')?.value,
        this.listFilter.find(x => x.condition === 'companyName')?.value,
        this.listFilter.find(x => x.condition === 'productCode')?.value,
        +ev.item,
        this.listFilter.find(x => x.condition === 'status')?.value,
        this.listFilter.find(x => x.condition === 'type')?.value,
      );
    } else if (ev.type === 'approve') {
      const item = {
        ProductId: ev.item.productId,
        Type: 2,
      };
      this.productService.edit(ev.item.productId, item).subscribe(res => {
        this.ngOnInit();
      });
    }
  }



}
