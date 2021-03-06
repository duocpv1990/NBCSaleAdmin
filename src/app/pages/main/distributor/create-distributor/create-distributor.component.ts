import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributorModel } from 'src/app/models/distributor.model';
import { AddressService } from 'src/app/services/address.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-create-distributor',
  templateUrl: './create-distributor.component.html',
  styleUrls: ['./create-distributor.component.scss']
})
export class CreateDistributorComponent implements OnInit {
  conFig = new DistributorModel();
  dataModel: any = {};
  option = {
    title: 'Thêm mới nhà phân phối',
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
    private addressService: AddressService,
    private enterpriseService: EnterpriseService,
    private distributorService: DistributorService,
    private dialogRef: MatDialogRef<CreateDistributorComponent>,
  ) { }
  listCreate = [];

  ngOnInit(): void {
    if (this.data && this.data.distributorId) {
      this.dataModel = this.data;
      this.option = {
        title: 'CHỈNH SỬA THÔNG TIN NHÀ PHÂN PHỐI',
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
    this.enterpriseService.getEnterprise('', '', 1, 500, 1, '').subscribe(res => {
      this.listCreate.forEach(create => {
        if (create.id === 'name' && res.length !== 0) {
          create.data = res.payload.map(x => {
            return {
              id: x.CompanyId,
              value: x.Name,
            };
          });
        }
      });
    });

    this.addressService.getNation().subscribe(res => {
      this.listCreate.forEach(create => {
        if (create.id === 'country' && res.length !== 0) {
          create.data = res.map(x => {
            return {
              id: x.NationId,
              value: x.Name,
            };
          });
        }
      });
    });

    if (this.data && this.data.country) {
      this.addressService.getProvince(this.data.country).subscribe(res => {
        this.listCreate.forEach(create => {
          if (create.id === 'city' && res.length !== 0) {
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
    if (this.data && this.data.city) {
      this.addressService.getDistrict(this.data.city).subscribe(res => {
        this.listCreate.forEach(create => {
          if (create.id === 'district' && res.length !== 0) {
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
      case 'country':
        this.addressService.getProvince(value.id).subscribe(res => {
          this.listCreate.forEach(create => {
            if (create.id === 'city' && res.length !== 0) {
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
      case 'city':
        this.addressService.getDistrict(value.id).subscribe(res => {
          this.listCreate.forEach(create => {
            if (create.id === 'district' && res.length !== 0) {
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
      case 'btn-save':
        this.onFunictionSave();
        break;
      case 'btn-cancel':
        this.dialogRef.close(false);
        break;
      default:
        break;
    }
  }

  onFunictionSave = () => {
    if (this.option.type === 'create') {
    }
    const item = {
      DistributorId: this.dataModel.distributorId,
      CompanyId: this.dataModel.name,
      Name: this.dataModel.distributorName,
      TaxCode: this.dataModel.mst,
      NationId: this.dataModel.country,
      ProvinceId: this.dataModel.city,
      DistrictId: this.dataModel.district,
      AddressDetail: this.dataModel.address,
      Type: (this.dataModel.Type) ? this.dataModel.Type : 1,
      Status: (this.dataModel.Status) ? this.dataModel.Status : 1,
      PhoneNumber: this.dataModel.phone,
      Email: this.dataModel.email,
      Website: this.dataModel.website,
      DistributorMedias: []
      // MediaURL: this.dataModel.DistributorMedias.find(x => x.Type === 1 && x.Status === 1)?.MediaURL,
      // BackgroundURL: res.DistributorMedias.find(x => x.Type === 2 && x.Status === 1)?.MediaURL,
    };
    if (this.dataModel && this.dataModel.MediaURL) {
      if (this.dataModel.checkMediaUrl === true && this.dataModel.distributorId) {
        this.distributorService.updateImage({
          DistributorId: this.dataModel.distributorId,
          MediaURL: this.dataModel.MediaURL,
          Type: 1,
          Status: 1
        }).subscribe(res => {
        });
      } else {
        item.DistributorMedias.push(
          {
            MediaURL: this.dataModel.MediaURL,
            Type: 1,
            Status: 1
          }
        );
      }
    }
    if (this.dataModel && this.dataModel.BackgroundURL) {
      if (this.dataModel.checkBackgroundURL === true && this.dataModel.distributorId) {
        this.distributorService.updateImage({
          DistributorId: this.dataModel.distributorId,
          MediaURL: this.dataModel.BackgroundURL,
          Type: 2,
          Status: 1
        }).subscribe(res => {
        });
      } else {
        item.DistributorMedias.push(
          {
            MediaURL: this.dataModel.BackgroundURL,
            Type: 2,
            Status: 1
          }
        );
      }
    }
    // if (this.dataModel && this.dataModel.MediaURL) {
    //   item.DistributorMedias.push(
    //     {
    //       MediaURL: this.dataModel.MediaURL,
    //       Type: 1,
    //       Status: 1
    //     }
    //   );
    // }
    // if (this.dataModel && this.dataModel.BackgroundURL) {
    //   item.DistributorMedias.push(
    //     {
    //       MediaURL: this.dataModel.BackgroundURL,
    //       Type: 2,
    //       Status: 1
    //     }
    //   );
    // }
    if (this.dataModel && this.dataModel.distributorId) {
      this.distributorService.edit(this.dataModel.distributorId, item).subscribe(res => {
        this.dialogRef.close(true);
      });
    } else {
      this.distributorService.add(item).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }


}
