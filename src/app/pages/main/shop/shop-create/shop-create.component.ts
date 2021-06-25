import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { ShopModel } from 'src/app/models/shop.model';
import { AddressService } from 'src/app/services/address.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shop-create',
  templateUrl: './shop-create.component.html',
  styleUrls: ['./shop-create.component.scss']
})
export class ShopCreateComponent implements OnInit {

  conFig = new ShopModel();
  dataModel;
  option = {
    title: 'THÊM MỚI ĐIỂM BÁN',
    type: 'create',
    subtitle: 'THÔNG TIN CHUNG'
  };

  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Lưu'
  }];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShopCreateComponent>,
    private storeService: StoreService,
    private addressService: AddressService,
    private enterpriseService: EnterpriseService,
    private distributorService: DistributorService,
  ) { }
  listCreate = [];

  ngOnInit(): void {
    this.dataModel = this.data;
    if (this.data && this.data.StoreId) {
      this.option = {
        title: 'CHỈNH SỬA THÔNG TIN ĐIỂM BÁN',
        type: 'edit',
        subtitle: 'THÔNG TIN CHUNG'
      };
      this.arrayButton = [{
        class: 'btn-cancel',
        text: 'Hủy bỏ'
      },
      {
        class: 'btn-save',
        text: 'Chỉnh sửa'
      }];
    }
    this.listCreate = this.conFig.create;
    // this.enterpriseService.getEnterprise('', '', 1, 500, 1, '').subscribe(res => {
    //   this.listCreate.forEach(create => {
    //     if (create.id === 'CompanyId' && res.length !== 0) {
    //       create.data = res.payload.map(x => {
    //         return {
    //           id: x.CompanyId,
    //           value: x.Name,
    //         };
    //       });
    //     }
    //   });
    // });
    // this.distributorService.getDistributor('', 1, 500, '').subscribe(res => {
    //   this.listCreate.forEach(create => {
    //     if (create.id === 'name' && res.length !== 0) {
    //       create.data = res.payload.map(x => {
    //         return {
    //           id: x.DistributorId,
    //           value: x.Name,
    //         };
    //       });
    //     }
    //   });
    // });
    this.addressService.getNation().subscribe(res => {
      this.listCreate.forEach(create => {
        if (create.id === 'NationId' && res.length !== 0) {
          create.data = res.map(x => {
            return {
              id: x.NationId,
              value: x.Name,
            };
          });
        }
      });
    });

    if (this.data && this.data.NationId) {
      this.addressService.getProvince(this.data.NationId).subscribe(res => {
        this.listCreate.forEach(create => {
          if (create.id === 'ProvinceId' && res.length !== 0) {
            create.data = res.map(x => {
              return {
                id: x.ProvinceId,
                value: x.Name,
              };
            });
          }
        });
      });
    }
    if (this.data && this.data.ProvinceId) {
      this.addressService.getDistrict(this.data.city).subscribe(res => {
        this.listCreate.forEach(create => {
          if (create.id === 'DistrictId' && res.length !== 0) {
            create.data = res.map(x => {
              return {
                id: x.DistrictId,
                value: x.Name,
              };
            });
          }
        });
      });
    }
  }
  handleCallbackOption(value): void {
    switch (value.type) {
      case 'NationId':
        this.addressService.getProvince(value.id).subscribe(res => {
          this.listCreate.forEach(create => {
            if (create.id === 'ProvinceId' && res.length !== 0) {
              create.data = res.map(x => {
                return {
                  id: x.ProvinceId,
                  value: x.Name,
                };
              });
            }
          });
        });
        break;
      case 'ProvinceId':
        this.addressService.getDistrict(value.id).subscribe(res => {
          this.listCreate.forEach(create => {
            if (create.id === 'DistrictId' && res.length !== 0) {
              create.data = res.map(x => {
                return {
                  id: x.DistrictId,
                  value: x.Name,
                };
              });
            }
          });
        });
        break;
      default:
        break;
    }
  }
  handleCallbackEvent = (value) => {
    console.log(value);

    switch (value.class) {
      case 'btn-cancel':
        this.dialogRef.close(false);
        break;
      case 'btn-save':
        this.save();
        break;
      default:
        break;
    }
  }

  cancel = () => {
  }

  save = () => {
    const item = this.dataModel;
    if (this.dataModel && this.dataModel.MediaURL) {
      if (this.dataModel.checkMediaUrl === true && this.dataModel.StoreId) {
        this.storeService.updateImage({
          StoreId: this.dataModel.StoreId,
          MediaURL: this.dataModel.MediaURL,
          Type: 1,
          Status: 1
        }).subscribe(res => {
        });
      } else {
        item.StoreMedias.push(
          {
            MediaURL: this.dataModel.MediaURL,
            Type: 1,
            Status: 1
          }
        );
      }
    }
    if (this.dataModel && this.dataModel.BackgroundURL) {
      if (this.dataModel.checkBackgroundURL === true && this.dataModel.StoreId) {
        this.storeService.updateImage({
          StoreId: this.dataModel.StoreId,
          MediaURL: this.dataModel.BackgroundURL,
          Type: 2,
          Status: 1
        }).subscribe(res => {
        });
      } else {
        item.StoreMedias.push(
          {
            MediaURL: this.dataModel.BackgroundURL,
            Type: 2,
            Status: 1
          }
        );
      }
    }
    if (this.dataModel && this.dataModel.StoreId) {
      this.storeService.edit(this.dataModel.StoreId, item).subscribe(res => {
        this.dialogRef.close(true);
      });
    } else {
      this.storeService.add(item).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }


}
