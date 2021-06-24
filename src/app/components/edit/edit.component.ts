import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent extends BaseUploadComponent implements OnInit {
  @Input() data: any;
  @Input() option: any;
  @Input() arrayButton: any;
  @Input() dataModel?: any;
  @Output() callback = new EventEmitter<any>();
  @Output() callBackOption = new EventEmitter<any>();

  html: '';
  type = 0;
  model: any = {};
  lstImg = [];
  // modelChill: any = {};
  imagePath;
  imgURL;
  constructor(public s3Service: S3FileService) {
    super(s3Service);

  }
  // constructor(
  // ) { }

  ngOnInit() {
    this.model = this.dataModel || {};
    // this.modelChill = this.dataModel || {};
  }

  preview(files, value) {
    this.selectImage(files).subscribe(result => {
      console.log(this.imageLinkUpload, value);
      if (value === 'avatar') {
        this.model.MediaURL = this.imageLinkUpload;
        this.model.checkMediaUrl = true;
      } else if (value === 'background') {
        this.model.BackgroundURL = this.imageLinkUpload;
        this.model.checkBackgroundURL = true;
      }
    });
    // debugger;
    // if (value === 'MediaURL') {
    //   if (files.length === 0)
    //     return;
    //   let reader = new FileReader();
    //   this.imagePath = files;
    //   reader.readAsDataURL(files[0]);
    //   reader.onload = (_event) => {
    //     this.model.MediaURL = reader.result;
    //   }
    // }
    // else if (value === 'BackgroundURL') {
    //   if (files.length === 0)
    //     return;
    //   let reader = new FileReader();
    //   this.imagePath = files;
    //   reader.readAsDataURL(files[0]);
    //   reader.onload = (_event) => {
    //     this.model.BackgroundURL = reader.result;
    //     console.log(this.model);

    //   }
    // }

  }
  addUrl(files): void {
    console.log(files);
    this.multipleUpload(files).subscribe(res => {
      console.log(res, this.fileLinkList);
    });
  }
  handleCallbackOption(value, typeOption): void {
    const data = {
      id: +this.model[typeOption],
      type: typeOption,
    };
    this.callBackOption.emit(data);

  }
  onCallBackData = () => { }

  onClickButton = (i) => {
    i.data = this.model;
    i.data.CertificationMedia = this.fileLinkList.map(x => {
      return {
        MediaURL: x,
        Type: 1,
        Status: 1
      };
    });

    this.callback.emit(i);
  }
  addCer(): void {
    const data = {
      type: 'add',
    };
    this.callback.emit(data);
  }
}

@NgModule({
  declarations: [EditComponent],
  imports: [CommonModule, MatDialogModule, FormsModule, MatIconModule],
  exports: [EditComponent],
})
export class EditModule { }
