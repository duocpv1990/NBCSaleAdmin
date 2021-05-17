import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EnterPrise, EnterPriseModel } from 'src/app/models/enterprise.model';

@Component({
  selector: 'app-create-license',
  templateUrl: './create-license.component.html',
  styleUrls: ['./create-license.component.scss']
})
export class CreateLicenseComponent implements OnInit {
  check = 1;
  listUpload: any;
  model = new EnterPrise();
  name: string;
  link: string;
  listMedia = [];
  date: string;
  constructor(
    private dialogRef: MatDialogRef<CreateLicenseComponent>,
  ) { }

  ngOnInit(): void {
  
  }

  clickUpload(value){
      this.check = value;
  }

  preview(files){
    console.log(files[1].name);
    this.listUpload = files;
    this.model.MediaURLList = this.listUpload;
  }
  save(){
    
    this.dialogRef.close(this.model);
  }
  cancel(){
    this.dialogRef.close(null);
  }


}
