import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';

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

  totalPage: number;
  currentPage = 1;
  dataSub = [];
  pageSize = 5;

  constructor() { }

  ngOnChanges() {
    this.totalPage = Math.ceil((this.dataLength / this.pageSize));
    console.log(this.data);
    this.dataSub = this.data;

    // this.onLoadDatePagitor();
  }

  ngOnInit() {
    this.currentPage = 1;
    // this.totalPage = Math.ceil((this.data.length / this.pageSize));
    // this.onLoadDatePagitor();
  }

  nextPage = () => {
    if (this.currentPage + 1 > this.totalPage) return;
    this.currentPage += 1;
    this.onLoadDatePagitor();
  }

  backPage = () => {
    if (this.currentPage - 1 === 0) return;
    this.currentPage -= 1;
    this.onLoadDatePagitor();
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
      item: item,
      type: type
    })
  }

  onClickBtnActive = (i) => {
    this.callback.emit({
      type: i.type,
      service: i.service
    })
  }

  handleRouteLink = (item) => {
    this.callback.emit({
      type: 'route',
      item: item
    })
  }
  handleClickRow(item) {
    this.callback.emit({
      item: item,
      type: 'edit'
    });
  }
}

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableBaseModule { }
