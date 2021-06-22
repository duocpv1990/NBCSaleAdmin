import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { AddressService } from 'src/app/services/address.service';
import { MediaService } from 'src/app/services/media.service';
import { EditModule } from 'src/app/components/edit/edit.component';

@Component({
  selector: 'app-enterprise-edit',
  templateUrl: './enterprise-edit.component.html',
  styleUrls: ['./enterprise-edit.component.scss']
})
export class EnterpriseEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EnterpriseEditComponent>,
    private addressService: AddressService,
    private dialog: MatDialog,
    private mediaService: MediaService
  ) {
    dialogRef.disableClose = true;
  }
  conFig = new EnterPriseModel();
  dataModel;
  option = {
    title: 'THÔNG TIN DOANH NGHIỆP',
    type: 'edit',
    subtitle: 'THÔNG TIN CHUNG'
  };

  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Chỉnh sửa'
  }];
  listCreate = [];

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
    if (!this.data) {
      this.option = {
        title: 'Thêm mới doanh nghiệp',
        type: 'create',
        subtitle: 'THÔNG TIN CHUNG'
      };
    }
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
    // this.mediaService.getCompanyMedia(this.data.companyId).subscribe(res => {
    //   this.data.MediaURL = res.find(x => x.Type === 1)?.MediaURL;
    //   this.data.BackgroundURL = res.find(x => x.Type === 2)?.MediaURL;
    // });
    // this.data.MediaURL = this.data.CompanyMedias.find(x => x.Type === 1)?.MediaURL;
    // this.data.BackgroundURL = this.data.CompanyMedias.find(x => x.Type === 2)?.MediaURL;
    this.dataModel = this.data;
  }
  handleCallbackEvent = (value) => {
    switch (value.class) {
      case 'btn-cancel':
        this.cancel();
        this.dialogRef.close();
        break;
      case 'btn-save':
        this.save(value.data);
        this.dialogRef.close();
        break;
      default:
        break;
    }
    if (value.type === 'add') {
      this.dialogRef.close('add');
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
  cancel = () => {
  }

  save = (value) => {
    this.dataModel = value;
  }


}
