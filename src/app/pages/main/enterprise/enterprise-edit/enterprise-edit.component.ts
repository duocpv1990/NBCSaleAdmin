import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { AddressService } from 'src/app/services/address.service';
import { MediaService } from 'src/app/services/media.service';

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
    private mediaService: MediaService
  ) { }
  conFig = new EnterPriseModel();
  dataModel;
  option = {
    title: 'THÔNG TIN DOANH NGHIỆP',
    type: 'edit'
  };

  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Chỉnh sửa'
  }]
  listCreate = [];

  ngOnInit(): void {
    this.listCreate = this.conFig.create;
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
    this.mediaService.getCompanyMedia(this.data.companyId).subscribe(res => {
      this.data.MediaURL = res.find(x => x.Type === 1)?.MediaURL;
      this.data.BackgroundURL = res.find(x => x.Type === 2)?.MediaURL;
    });
    this.dataModel = this.data;
  }

  handleCallbackEvent = (value) => {
    console.log(value);

    switch (value.class) {
      case 'btn-cancel':
        this.cancel();
        break;
      case 'btn-save':
        this.save(value.data)
        break;
      default:
        break;
    }
    this.dialogRef.close();
  }
  handleCallbackOption(value): void {
    switch (value.type) {
      case 'country':
        this.addressService.getProvince(value.id).subscribe(res => {
          console.log(res);
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
          console.log(res);
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
