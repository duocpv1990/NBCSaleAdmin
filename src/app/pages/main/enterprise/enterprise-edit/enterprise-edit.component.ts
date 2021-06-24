import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { AddressService } from 'src/app/services/address.service';
import { MediaService } from 'src/app/services/media.service';
import { EditModule } from 'src/app/components/edit/edit.component';
import { CertificateEnterpriseComponent } from '../certificate-enterprise/certificate-enterprise.component';
import { CertificationService } from 'src/app/services/certification.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';

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
    private enterpriseService: EnterpriseService,
    private mediaService: MediaService,

    private certificationService: CertificationService,
    private dialogCer: MatDialog
  ) {
    dialogRef.disableClose = true;
  }
  conFig = new EnterPriseModel();
  dataModel;
  option = {
    title: 'THÔNG TIN DOANH NGHIỆP',
    type: 'edit',
    subtitle: 'THÔNG TIN CHUNG',
    showAddCer: true
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
    if (!this.data || !this.data.companyId) {
      this.option = {
        title: 'Thêm mới doanh nghiệp',
        type: 'create',
        subtitle: 'THÔNG TIN CHUNG',
        showAddCer: true
      };
      this.arrayButton = [{
        class: 'btn-cancel',
        text: 'Hủy bỏ'
      },
      {
        class: 'btn-save',
        text: 'Lưu'
      }];
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
      this.openAddCetificate(this.data?.companyId);
      // this.dialogRef.close('add');
    }
  }
  openAddCetificate(companyId): void {
    this.dialogCer.open(CertificateEnterpriseComponent, {
      width: '940px',
      height: '843px',
      data: companyId
    }).afterClosed().subscribe(result => {
      if (result.text === 'Lưu') {
        const req =
        {
          Name: result.data['name-full'],
          ExpiredDate: result.data.date,
          Type: 1,
          Status: result.data.status,
          CertificationMedia: result.data.CertificationMedia
        };
        this.certificationService.add(req).subscribe(res => {
          this.dataModel.CompanyCertifications.push(
            {
              CertificationId: +res,
              Name: result.data['name-full'],
              ExpiredDate: result.data.date,
              Type: 1,
              Status: result.data.status,
              CertificationMedias: result.data.CertificationMedia.map(media => {
                return {
                  str: media.MediaURL.substring(media.MediaURL.lastIndexOf('/') + 1),
                  MediaURL: media.MediaURL,
                  Type: media.Type,
                  Status: media.Type
                };
              }),
            }
          );
          console.log(this.dataModel);

        });
      }
    });
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
    if (this.option.type === 'create') {
      this.dataModel = value;
    }
    const item = {
      CompanyId: this.dataModel.companyId,
      Name: this.dataModel.register,
      // Description: string,
      CompanyCode: this.dataModel.code,
      GLN: this.dataModel.global,
      TaxCode: this.dataModel.taxcode,
      NationId: this.dataModel.country,
      ProvinceId: this.dataModel.city,
      DistrictId: this.dataModel.district,
      AddressDetail: this.dataModel.address,
      PhoneNumber: this.dataModel.phone,
      Email: this.dataModel.email,
      Website: this.dataModel.website,
      Type: this.dataModel.Type,
      Status: this.dataModel.Status,
      CertificationIdList: (this.dataModel.CompanyCertifications) ? this.dataModel.CompanyCertifications.map(x => {
        return x.CertificationId;
      }) : [],
      companyMedias: []
      // companyMedias: [
      //   {
      //     CompanyMediaId: 0,
      //     CompanyId: 0,
      //     MediaId: 0,
      //     MediaURL: "string",
      //     Type: 0,
      //     Status: 0
      //   }
      // ]
    };
    if (this.dataModel && this.dataModel.MediaURL) {
      item.companyMedias.push(
        {
          MediaURL: this.dataModel.MediaURL,
          Type: 1,
          Status: 1
        }
      );
    }
    if (this.dataModel && this.dataModel.BackgroundURL) {
      item.companyMedias.push(
        {
          MediaURL: this.dataModel.BackgroundURL,
          Type: 2,
          Status: 1
        }
      );
    }
    if (this.dataModel && this.dataModel.companyId) {
      this.enterpriseService.edit(this.dataModel.companyId, item).subscribe(res => {
        this.dialogRef.close(true);
      });
    } else {
      this.enterpriseService.add(item).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
    this.dataModel = value;
  }


}
