import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  data = [
    // {
    //   "stt": "1",
    //   "code": "023456781",
    //   "MediaURL": "https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg",
    //   "distributor": "Nhà phân phối số 1",
    //   'address': "Hàng Bồ - Hoàn Kiếm - Hà Nội",
    //   'area': 'Hà Nội',
    //   'production': 0,
    //   'phone': '0123456789',
    //   "global": '023456781',
    //   "register": 'Công ty TNHH Việt An',
    //   "gt": '1 giấy tờ',
    //   "status": "Đã duyệt",
    //   "update": "13:30, 21/04/2021"
    // },
    // {
    //   "stt": "2",
    //   "code": "023456781",
    //   "MediaURL": "https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg",
    //   "distributor": "Nhà phân phối số 1",
    //   'address': "Hàng Bồ - Hoàn Kiếm - Hà Nội",
    //   'area': 'Hà Nội',
    //   'production': 0,
    //   'phone': '0123456789',
    //   "global": '023456781',
    //   "register": 'Công ty TNHH Việt An',
    //   "gt": '1 giấy tờ',
    //   "status": "Đã duyệt",
    //   "update": "13:30, 21/04/2021"

    // },
    // {
    //   "stt": "3",
    //   "code": "023456781",
    //   "MediaURL": "https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg",
    //   "global": '023456781',
    //   "register": 'Công ty TNHH Việt An',
    //   "gt": '1 giấy tờ',
    //   "status": "Đã duyệt",
    //   "update": "13:30, 21/04/2021",
    //   "distributor": "Nhà phân phối số 1",
    //   'address': "Hàng Bồ - Hoàn Kiếm - Hà Nội",
    //   'area': 'Hà Nội',
    //   'production': 0,
    //   'phone': '0123456789',
    // },
    // {
    //   "stt": "4",
    //   "code": "023456781",
    //   "MediaURL": "https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg",
    //   "global": '023456781',
    //   "register": 'Công ty TNHH Việt An',
    //   "gt": '1 giấy tờ',
    //   "status": "Đã duyệt",
    //   "update": "13:30, 21/04/2021",
    //   "distributor": "Nhà phân phối số 1",
    //   'address': "Hàng Bồ - Hoàn Kiếm - Hà Nội",
    //   'area': 'Hà Nội',
    //   'production': 0,
    //   'phone': '0123456789',
    // },
    // {
    //   "stt": "5",
    //   "code": "023456781",
    //   "MediaURL": "https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg",
    //   "global": '023456781',
    //   "register": 'Công ty TNHH Việt An',
    //   "gt": '1 giấy tờ',
    //   "status": "Đã duyệt",
    //   "update": "13:30, 21/04/2021",
    //   "distributor": "Nhà phân phối số 1",
    //   'address': "Hàng Bồ - Hoàn Kiếm - Hà Nội",
    //   'area': 'Hà Nội',
    //   'production': 0,
    //   'phone': '0123456789',
    // },
    // {
    //   "stt": "6",
    //   "code": "023456781",
    //   "MediaURL": "https://lh4.ggpht.com/-Z_ue0VfOfsk/V4WroOv9Y7I/AAAAAAAAEjc/6mDfRJsMMYoU5q-drqGfQb6oT1Cm4UYOQCLcB/s1600/but%2Bthien%2Blong.jpg",

    //   "global": '023456781',
    //   "register": 'Công ty TNHH Việt An',
    //   "gt": '1 giấy tờ',
    //   "status": "Đã duyệt",
    //   "update": "13:30, 21/04/2021",
    //   "distributor": "Nhà phân phối số 1",
    //   'address': "Hàng Bồ - Hoàn Kiếm - Hà Nội",
    //   'area': 'Hà Nội',
    //   'production': 0,
    //   'phone': '0123456789',

    // },


  ];
  dataTable;
  listActive;
  dataSub;
  ngOnInit(): void {
    this.listFilter = this.config.filter;
    this.dataTable = this.config.collums;
    this.listActive = this.config.btnActice;
    this.dataSub = this.data;
    this.getListDistributor(1, '');
  }
  getListDistributor(pageCurrent: number, name: string, provinceId?: number): void {
    this.distributorService.getDistributor(name ? name : '', pageCurrent, 5, provinceId).subscribe((res) => {
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
          update: (x.UpdatedOn !== null) ? this.serviceDate.formatDate(x.UpdatedOn, 'hh:mm MM/DD/YYYY') : ''
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
      this.listFilter.find(x => x.condition === 'city')?.value
    );
  }
  handleCallbackTable(ev) {
    console.log(ev);
    if (ev.type === 'create') {
      return this.dialog.open(CreateDistributorComponent, {
        width: '940px',
        height: '843px'
      }).afterClosed().subscribe(result => {
      });
    }

    if (ev.type === 'delete') {
      return this.dialog.open(DeleteDistributorComponent, {
        width: '400px',
        height: '250px',
        data: {
          item: ev.item.distributorId,
          title: "Xoá nhà phân phối",
          content: "Bạn có muốn xoá thông tin nhà phân phối trên hệ thống?"
        }
      }).afterClosed().subscribe(result => {
        if (result === true) {
          this.ngOnInit();
        }
      });
    }

  }

}
