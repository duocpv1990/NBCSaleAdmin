import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CertificateModel } from 'src/app/models/certificate.model';

@Component({
  selector: 'app-certificate-enterprise',
  templateUrl: './certificate-enterprise.component.html',
  styleUrls: ['./certificate-enterprise.component.scss']
})
export class CertificateEnterpriseComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CertificateEnterpriseComponent>) {
    dialogRef.disableClose = true;
  }
  option = {
    title: 'Thêm mới chứng chỉ, chứng nhận',
    type: 'add',
    unShow: true
  };
  dataModel: any;
  conFig = new CertificateModel();
  listCreate = [];
  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Lưu'
  }];
  ngOnInit(): void {
    this.listCreate = this.conFig.create;
  }
  handleCallbackEvent(value): void {
    console.log(value);
    this.dialogRef.close(value);

  }
}
