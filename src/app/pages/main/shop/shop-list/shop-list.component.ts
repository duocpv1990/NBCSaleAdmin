import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { ShopModel } from 'src/app/models/shop.model';
import { AddressService } from 'src/app/services/address.service';
import { StoreService } from 'src/app/services/store.service';
import { ShopCreateComponent } from '../shop-create/shop-create.component';
import { ShopDeleteComponent } from '../shop-delete/shop-delete.component';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private storeService: StoreService,
    private addressService: AddressService,
  ) { }
  config = new ShopModel();
  listFilter = [];
  dataLength = 0;
  currrentPage = 1;
  data = [];
  dataTable;
  listActive;
  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.listActive = this.config.btnActice;
    this.dataTable = this.config.collums;
    this.getStores('', 0, 0, 1);
    this.getProvice();
  }
  getStores(name, provinceId, type, pageCurrent): void {
    this.storeService.getStores(name ? name : '',
      provinceId !== 0 ? provinceId : '', type !== 0 ? type : '', pageCurrent, 5).subscribe(res => {
      this.data = res.payload;
      this.dataLength = res.count;
      if (this.data && this.data.length !== 0) {
        this.data.forEach(element => {
          if (element.Type === 2) {
            element.type = 'Online';
          } else {
            element.type = 'Offline';
          }
        });
      }
    });
  }
  getProvice(): void {
    this.addressService.getProvince(916).subscribe(res => {
      this.listFilter.forEach(create => {
        if (create.condition === 'province' && res.length !== 0) {
          create.data = res.map(x => {
            return {
              value: x.ProvinceId,
              text: x.Name,
            };
          });
        }
      });
      console.log(this.listFilter, '12312');

    });
  }
  handleCallback(): void {
    this.getStores(
      this.listFilter.find(x => x.condition === 'name')?.value,
      this.listFilter.find(x => x.condition === 'province')?.value ?? 0,
      this.listFilter.find(x => x.condition === 'form')?.value ?? 0,
      1,
    );
  }
  handleCallbackTable(ev) {
    if (ev.type === 'create') {
      return this.dialog.open(ShopCreateComponent, {
        width: '940px',
        height: '843px',
        data: {
          StoreMedias: []
        }
      }).afterClosed().subscribe(result => {
        this.getStores('', 0, 0, 1);
      });
    } else if (ev.type === 'delete') {
      return this.dialog.open(ShopDeleteComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: [ev.item.StoreId],
          title: "Xoá điểm bán",
          content: "Bạn có muốn xoá thông tin điểm bán trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.getStores(
            this.listFilter.find(x => x.condition === 'name')?.value,
            this.listFilter.find(x => x.condition === 'province')?.value ?? 0,
            this.listFilter.find(x => x.condition === 'form')?.value ?? 0,
            1,
          );
        }
      });
    } else if (ev.type === 'deleteAll') {
      if (ev.data.length !== 0 ) {
        return this.dialog.open(ShopDeleteComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.data.map(x => {
              return x.StoreId;
            }),
            title: "Xoá điểm bán",
            content: "Bạn có muốn xoá thông tin điểm bán trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {
          if (result === true) {
            this.getStores(
              this.listFilter.find(x => x.condition === 'name')?.value,
              this.listFilter.find(x => x.condition === 'province')?.value ?? 0,
              this.listFilter.find(x => x.condition === 'form')?.value ?? 0,
              this.currrentPage,
            );
          }
        });
      }
    } else if (ev.type === 'page') {
      this.currrentPage = +ev.item;
      this.getStores(
        this.listFilter.find(x => x.condition === 'name')?.value,
        this.listFilter.find(x => x.condition === 'province')?.value ?? 0,
        this.listFilter.find(x => x.condition === 'form')?.value ?? 0,
        this.currrentPage
      );
    } else if (ev.type === 'edit') {
      this.storeService.getStoresDetail(ev.item.StoreId).subscribe( res => {
        const item = res;
        item.MediaURL = res.StoreMedias.find(x => x.Type === 1 && x.Status === 1)?.MediaURL;
        item.BackgroundURL = res.StoreMedias.find(x => x.Type === 2 && x.Status === 1)?.MediaURL;
        return this.dialog.open(ShopCreateComponent, {
          width: '940px',
          height: '843px',
          data: item
        }).afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      });
    } else if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px',
        data: 'store'
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
  }

}
