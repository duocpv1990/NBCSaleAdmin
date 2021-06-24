import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() dataLength: any;
  @Input() tableData: any;
  @Input() listActive?: any;
  @Output() callback = new EventEmitter<any>();
  isAllChecked = false;
  totalPage: number;
  currentPage = 1;
  dataSub = [];
  pageSize = 5;

  constructor() { }

  ngOnChanges() {
    this.totalPage = Math.ceil((this.dataLength / this.pageSize));
    this.dataSub = this.data;

    // this.onLoadDatePagitor();
  }

  ngOnInit() {
    this.currentPage = 1;
    // this.totalPage = Math.ceil((this.data.length / this.pageSize));
    // this.onLoadDatePagitor();
  }

  nextPage = () => {
    if (this.currentPage + 1 > this.totalPage) { return; }
    this.currentPage += 1;
    this.onLoadDatePagitor();
  }

  backPage = () => {
    if (this.currentPage - 1 === 0) { return; }
    this.currentPage -= 1;
    this.onLoadDatePagitor();
  }
  checkValue(isAll): void {
    if (isAll === false) {
      let check = true;
      this.dataSub.forEach(data => {
        if (data.checkbox === false) {
          check = false;
        }
      });
      console.log(this.isAllChecked);
      this.isAllChecked = check;
    } else {
      this.dataSub.forEach(data => {
        data.checkbox = this.isAllChecked;
      });
    }

  }
  onLoadDatePagitor = () => {
    this.callback.emit({
      item: this.currentPage,
      type: 'page'
    });
    // this.dataSub = this.data.filter((x, ix) => (this.currentPage - 1) * this.pageSize <= ix && ix < this.currentPage * this.pageSize);
  }

  onClickSetting = (item, type) => {
    this.callback.emit({
      item,
      type
    });
  }

  onClickBtnActive = (i) => {
    const dataDe = [];
    if (i.type === 'deleteAll') {
      this.dataSub.forEach(dat => {
        if (dat.checkbox === true) {
          dataDe.push(dat);
        }
      });
    }
    this.callback.emit({
      type: i.type,
      data: dataDe,
      service: i.service
    });
  }
  clickCreate(): void {
    this.callback.emit({
      type: 'create'
    });
  }
  import(): void {
    this.callback.emit({
      type: 'import',
    });
  }
  handleRouteLink = (item) => {
    this.callback.emit({
      type: 'route',
      item
    });
  }
  handleClickRow(item) {
    this.callback.emit({
      item,
      type: 'edit'
    });
  }
}

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableBaseModule { }
