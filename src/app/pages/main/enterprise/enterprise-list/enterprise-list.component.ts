import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/components/dialog/delete/delete.component';
import { EnterPriseModel } from 'src/app/models/enterprise.model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { DeleteEnterpriseComponent } from '../delete-enterprise/delete-enterprise.component';
import { EnterpriseCreateComponent } from '../enterprise-create/enterprise-create.component';
import { EnterpriseEditComponent } from '../enterprise-edit/enterprise-edit.component';

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit {
  config = new EnterPriseModel();
  listFilter = [];
  // data = [];
  data = [
    // }


  ];
  dataTable;
  listActive;
  dataSub;
  constructor(
    private dialog: MatDialog,
    private enterpriseService: EnterpriseService,
    private serviceDate: FormatDateService
  ) { }

  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.getListEnterprise('', '', 1);
  }
  /**
   *
   * @param pageCurrent current
   */
  getListEnterprise(code: string, name: string, pageCurrent: number, status?: number): void {
    this.enterpriseService.getEnterprise(code ? code : '', name ? name : '',
       pageCurrent, 5, status ? status : null).subscribe((res) => {
      console.log(res);
      this.data = res.map((x, index) => {
        return {
          stt: index + 1,
          companyId: x.CompanyId,
          code: x.CompanyCode,
          global: x.GLN,
          register: x.Name,
          status: (x.Status === 1) ? 'Hoạt động' : 'Không hoạt động',
          gt: x.CertificateNumber + ' giấy tờ',
          type: x.Type,
          update: (x.UpdatedOn !== null) ? this.serviceDate.formatDate(x.UpdatedOn, 'hh:mm MM/DD/YYYY') : ''
        };
      });
      this.dataSub = this.data;

    },
      (err) => {
        console.log(err);
      });
  }

  handleCallback(): void {
    console.log(this.listFilter);
    this.getListEnterprise(
      this.listFilter.find(x => x.condition === 'global')?.value,
      this.listFilter.find(x => x.condition === 'name')?.value,
      1,
      this.listFilter.find(x => x.condition === 'status')?.value
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
      return this.dialog.open(EnterpriseCreateComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
      });
    }
    else if (ev.type === 'edit') {
      console.log(ev);
      this.enterpriseService.getEnterpriseDetail(ev.item.companyId).subscribe((res) => {
        console.log(res);
        const item = {
          companyId: ev.item.companyId,
          code: res.CompanyCode,
          global: res.GLN,
          register: res.Name,
          status: (res.Status === 1) ? 'Đã duyệt' : 'Chưa duyệt',
          gt: res.CertificateNumber + ' giấy tờ',
          update: (res.UpdatedOn !== null) ? this.serviceDate.formatDate(res.UpdatedOn, 'hh:mm MM/DD/YYYY') : '',
          address: res.AddressDetail,
          taxcode: res.TaxCode,
          city: res.Province,
          district: res.District,
          country: res.Nation,
          website: res.Website,
          phone: res.PhoneNumber,
          email: res.Email,
        };
        return this.dialog.open(EnterpriseEditComponent, {
          width: '940px',
          height: '843px',
          data: item
        }).afterClosed().subscribe(result => {
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
          item: ev.item,
          title: "Xoá doanh nghiệp",
          content: "Bạn có muốn xoá thông tin doanh nghiệp trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
      });
    } else if (ev.type === 'page') {
      this.getListEnterprise(
        this.listFilter.find(x => x.condition === 'global')?.value,
        this.listFilter.find(x => x.condition === 'name')?.value,
        +ev.item,
        this.listFilter.find(x => x.condition === 'status')?.value
      );
    }
  }

}
