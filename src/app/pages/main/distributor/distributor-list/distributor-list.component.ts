import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImportExcelComponent } from 'src/app/components/dialog/import-excel/import-excel.component';
import { DistributorModel } from 'src/app/models/distributor.model';
import { DistributorService } from 'src/app/services/distributor.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { CreateDistributorComponent } from '../create-distributor/create-distributor.component';
import { DeleteDistributorComponent } from '../delete-distributor/delete-distributor.component';

@Component({
  selector: 'app-distributor-list',
  templateUrl: './distributor-list.component.html',
  styleUrls: ['./distributor-list.component.scss']
})
export class DistributorListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private distributorService: DistributorService,
    private serviceDate: FormatDateService
  ) { }
  config = new DistributorModel();
  listFilter = [];
  dataLength = 0;
  data = [];
  currrentPage = 1;
  dataTable;
  listActive;
  dataSub;
  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
    this.getListDistributor(1, '', '');
  }
  getListDistributor(pageCurrent: number, name: string, companyName: string): void {
    this.distributorService.getDistributor(name ? name : '', pageCurrent, 5, companyName ? companyName : '').subscribe((res) => {
      console.log(res);
      this.dataLength = res.count;
      this.data = res.payload.map((x, index) => {
        return {
          distributorId: x.DistributorId,
          code: x.TaxCode,
          global: x.GLN,
          distributor: x.Name,
          phone: x.PhoneNumber,
          area: "Hà Nội",
          address: x.AddressDetail,
          gt: x.ProductNumber + ' giấy tờ',
          MediaURL: x.MediaURL,
          production: x.ProductNumber,
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
  handleCallback() {
    this.getListDistributor(1,
      this.listFilter.find(x => x.condition === 'name-dis')?.value,
      this.listFilter.find(x => x.condition === 'name-ent')?.value
    );
  }
  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(CreateDistributorComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.ngOnInit();
        }
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
      this.distributorService.getDistributorDetail(ev.item.distributorId).subscribe((res) => {
        console.log(res);

        const item = {
          distributorId: ev.item.distributorId,
          name: res.CompanyId,
          distributorName: res.Name,
          mst: res.TaxCode,
          country: res.NationId,
          city: res.ProvinceId,
          district: res.DistrictId,
          address: res.AddressDetail,
          Type: res.Type,
          Status: res.Status,
          phone: res.PhoneNumber,
          email: res.Email,
          website: res.Website,
          MediaURL: res.DistributorMedias.find(x => x.Type === 1 && x.Status === 1)?.MediaURL,
          BackgroundURL: res.DistributorMedias.find(x => x.Type === 2 && x.Status === 1)?.MediaURL,

        };

        return this.dialog.open(CreateDistributorComponent, {
          width: '940px',
          height: '843px',
          data: item
        }).afterClosed().subscribe(result => {
          if (result === true) {
            this.ngOnInit();
          }
        });

      },
        (err) => {
          console.log(err);
        });
    }
    if (ev.type === 'delete') {
      return this.dialog.open(DeleteDistributorComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: [ev.item.distributorId],
          title: "Xoá nhà phân phối",
          content: "Bạn có muốn xoá thông tin nhà phân phối trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.ngOnInit();
        }
      });
    }
    if (ev.type === 'deleteAll') {
      if (ev.data.length !== 0) {
        return this.dialog.open(DeleteDistributorComponent, {
          width: '400px',
          height: '250px',
          data: {
            item: ev.data.map(x => {
              return x.distributorId;
            }),
            title: "Xoá nhà phân phối",
            content: "Bạn có muốn xoá thông tin nhà phân phối trên hệ thống?"
          }
        }).afterClosed().subscribe(result => {
          if (result === true) {
            this.getListDistributor(this.currrentPage,
              this.listFilter.find(x => x.condition === 'name-dis')?.value,
              this.listFilter.find(x => x.condition === 'name-ent')?.value
            );
          }
        });
      }
    }
    if (ev.type === 'page') {
      this.currrentPage = +ev.item;
      this.getListDistributor(+ev.item,
        this.listFilter.find(x => x.condition === 'name-dis')?.value,
        this.listFilter.find(x => x.condition === 'name-ent')?.value
      );
    }
    if (ev.type === 'approve') {
      const item = {
        DistributorId: ev.item.distributorId,
        CompanyId: ev.item.name,
        Name: ev.item.distributorName,
        TaxCode: ev.item.mst,
        NationId: ev.item.country,
        ProvinceId: ev.item.city,
        DistrictId: ev.item.district,
        AddressDetail: ev.item.address,
        Type: 2,
        Status: (ev.item.Status) ? ev.item.Status : 1,
        PhoneNumber: ev.item.phone,
        Email: ev.item.email,
        Website: ev.item.website,
        DistributorMedias: []
      };
      this.distributorService.edit(ev.item.distributorId, item).subscribe(res => {
        this.ngOnInit();
      });
    }

  }

}
