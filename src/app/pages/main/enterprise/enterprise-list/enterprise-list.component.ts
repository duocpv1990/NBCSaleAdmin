import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/dialog/delete/delete.component';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
// import { AuthenticationService } from 'src/app/services/auth.service';
import { CertificationService } from 'src/app/services/certification.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { CertificateEnterpriseComponent } from '../certificate-enterprise/certificate-enterprise.component';
import { DeleteEnterpriseComponent } from '../delete-enterprise/delete-enterprise.component';
import { EnterpriseEditComponent } from '../enterprise-edit/enterprise-edit.component';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit {
  config = new EnterPriseModel();
  listFilter = [];
  data = [];
  dataLength = 0;
  currrentPage = 1;
  dataTable;
  listActive;
  dataSub;
  constructor(
    private dialog: MatDialog,
    private dialogCer: MatDialog,
    private enterpriseService: EnterpriseService,
    private serviceDate: FormatDateService,
    private certificationService: CertificationService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.getListEnterprise('', '', 1, 0, 0);
  }
  /**
   *
   * @param pageCurrent current
   */
  getListEnterprise(code: string, name: string, pageCurrent: number, status?: number, type?: number): void {
    this.enterpriseService.getEnterprise(code ? code : '', name ? name : '',
      pageCurrent, 5, status !== 0 ? status : '', type !== 0 ? type : '').subscribe((res) => {
        this.dataLength = res.count;
        this.data = res.payload.map((x, index) => {
          return {
            stt: index + 1,
            companyId: x.CompanyId,
            code: x.CompanyCode,
            global: x.GLN,
            register: x.Name,
            status: (x.Status === 2) ? 'Hoạt động' : 'Không hoạt động',
            gt: x.CertificateNumber + ' giấy tờ',
            type: x.Type,
            update: (x.UpdatedOn !== null) ? this.serviceDate.formatDate(x.UpdatedOn, 'hh:mm MM/DD/YYYY') : '',
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
    this.getListEnterprise(
      this.listFilter.find(x => x.condition === 'global')?.value,
      this.listFilter.find(x => x.condition === 'name')?.value,
      1,
      this.listFilter.find(x => x.condition === 'status')?.value ?? 0,
      this.listFilter.find(x => x.condition === 'type')?.value ?? 0
    );
    // const filter = this.listFilter.filter(x => x.value);
    // if (!filter.length) return this.dataSub = this.data;
    // filter.forEach((x, ix) => {
    //   if (ix === 0) {
    //     if (x.type === 'text' || x.type === 'search') {
    //       this.dataSub = this.data.filter(
    //         (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
    //     } else {
    //       this.dataSub = this.data.filter((a) => a[x.condition] == x.value);
    //     }
    //   } else {
    //     if (x.type === 'text' || x.type === 'search') {
    //       this.dataSub = this.dataSub.filter(
    //         (a) => a[x.condition].toLowerCase().indexOf(x.value.toLowerCase()) > -1);
    //     } else {
    //       this.dataSub = this.dataSub.filter((a) => a[x.condition] == x.value);
    //     }
    //   }

    // });
  }
  // tslint:disable-next-line:typedef
  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(EnterpriseEditComponent, {
        width: '940px',
        height: '843px',
        data: {
          CompanyCertifications: []
        }
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    } else if (ev.type === 'import') {
      return this.dialog.open(ImportExcelComponent, {
        width: '500px',
        height: '350px',
        data: 'company'
      }).afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    }
    else if (ev.type === 'edit') {
      console.log(ev);
      this.enterpriseService.getEnterpriseDetail(ev.item.companyId).subscribe((res) => {
        const item = {
          companyId: ev.item.companyId,
          code: res.CompanyCode,
          global: res.GLN,
          register: res.Name,
          status: (res.Status === 2) ? 'Đã duyệt' : 'Chưa duyệt',
          gt: res.CertificateNumber + ' giấy tờ',
          update: (res.UpdatedOn !== null) ? this.serviceDate.formatDate(res.UpdatedOn, 'hh:mm MM/DD/YYYY') : '',
          address: res.AddressDetail,
          taxcode: res.TaxCode,
          website: res.Website,
          phone: res.PhoneNumber,
          email: res.Email,
          country: res.NationId,
          city: res.ProvinceId,
          district: res.DistrictId,
          Type: res.Type,
          Status: res.Status,
          MediaURL: res.CompanyMedias.find(x => x.Type === 1 && x.Status === 1)?.MediaURL,
          BackgroundURL: res.CompanyMedias.find(x => x.Type === 2 && x.Status === 1)?.MediaURL,
          CompanyCertifications: []
        };
        if (res.CompanyCertifications && res.CompanyCertifications.length !== 0) {
          item.CompanyCertifications = res.CompanyCertifications.map(cer => {
            return {
              CertificationId: cer.CertificationId,
              Name: cer.Name,
              Status: cer.Status,
              ExpiredDate: (cer.ExpiredDate !== null) ? this.serviceDate.formatDate(cer.ExpiredDate, 'MM/DD/YYYY') : '',
              CertificationMedias: cer.CertificationMedias.map(media => {
                return {
                  str: media.MediaURL.substring(media.MediaURL.lastIndexOf('/') + 1),
                  MediaURL: media.MediaURL,
                  Type: media.Type,
                  Status: media.Type
                };
              }),
            };
          });
        }
        return this.dialog.open(EnterpriseEditComponent, {
          width: '940px',
          height: '843px',
          data: item
        }).afterClosed().subscribe(result => {
          this.ngOnInit();
        });

      },
        (err) => {
          console.log(err);
        });
    }
    else if (ev.type === 'delete') {
      return this.dialog.open(DeleteEnterpriseComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: [ev.item.companyId],
          title: "Xoá doanh nghiệp",
          content: "Bạn có muốn xoá thông tin doanh nghiệp trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.getListEnterprise(
            this.listFilter.find(x => x.condition === 'global')?.value,
            this.listFilter.find(x => x.condition === 'name')?.value,
            1,
            this.listFilter.find(x => x.condition === 'status')?.value ?? 0,
            this.listFilter.find(x => x.condition === 'type')?.value ?? 0,
          );
        }
      });
    } else if (ev.type === 'deleteAll') {
      if (ev.data.length !== 0 ) {
        return this.dialog.open(DeleteEnterpriseComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.data.map(x => {
              return x.companyId;
            }),
            title: "Xoá doanh nghiệp",
            content: "Bạn có muốn xoá thông tin doanh nghiệp trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {
          if (result === true) {
            this.getListEnterprise(
              this.listFilter.find(x => x.condition === 'global')?.value,
              this.listFilter.find(x => x.condition === 'name')?.value,
              this.currrentPage,
              this.listFilter.find(x => x.condition === 'status')?.value ?? 0,
              this.listFilter.find(x => x.condition === 'type')?.value ?? 0,
            );
          }
        });
      }
    }
     else if (ev.type === 'page') {
      this.currrentPage = +ev.item;
      this.getListEnterprise(
        this.listFilter.find(x => x.condition === 'global')?.value,
        this.listFilter.find(x => x.condition === 'name')?.value,
        +ev.item,
        this.listFilter.find(x => x.condition === 'status')?.value ?? 0,
        this.listFilter.find(x => x.condition === 'type')?.value ?? 0,
      );
    } else if (ev.type === 'approve') {
      const item = {
        CompanyId: ev.item.companyId,
        Name: ev.item.register,
        // Description: string,
        CompanyCode: ev.item.code,
        GLN: ev.item.global,
        TaxCode: ev.item.taxcode,
        NationId: ev.item.country,
        ProvinceId: ev.item.city,
        DistrictId: ev.item.district,
        AddressDetail: ev.item.address,
        PhoneNumber: ev.item.phone,
        Email: ev.item.email,
        Website: ev.item.website,
        Type: 2,
        Status: ev.item.Status,
        CertificationIdList: (ev.item.CompanyCertifications) ? ev.item.CompanyCertifications.map(x => {
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
      this.enterpriseService.edit(ev.item.companyId, item).subscribe(res => {
        this.ngOnInit();
      });
    }
  }

}
