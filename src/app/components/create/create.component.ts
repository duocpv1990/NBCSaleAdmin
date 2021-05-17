import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CreateLicenseComponent } from 'src/app/pages/main/enterprise/create-license/create-license.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() data: any;
  @Input() option: any;
  @Input() arrayButton: any;
  @Input() dataModel?: any;
  @Output() callback = new EventEmitter<any>();

  html: '';
  model: any = {};
  imagePath;
  imgURL;
  result = null;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.model = this.dataModel || {};
  }

  preview(files, value) {
     if (value === 'avatar') {
      if (files.length === 0)
        return;
      let reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.model.MediaURL = reader.result;
      }
    }
    else if(value === 'background'){
      if (files.length === 0)
      return;
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.model.BackgroundURL = reader.result;
      console.log(this.model);
      
    }
    }

  }
  onCallBackData = () => { }

  onClickButton = (i) => {
    i.data = this.model;
    this.callback.emit(i);
  }
  onClick(){
    return this.dialog.open(CreateLicenseComponent, {
      width: '940px',
      height: '843px'
    }).afterClosed().subscribe(result => {
      this.result = result;
      
    });
  }
}

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, MatDialogModule, FormsModule, MatIconModule],
  exports: [CreateComponent],
})
export class CreateModule { }
