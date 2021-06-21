import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, NgModule, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() tableData: any;
  @Input() listActive?: any;
  @Output() callback = new EventEmitter<any>();

  totalPage: number;
  currentPage: number = 1;
  dataSub = [];
  pageSive = 5;

  constructor() { }

  ngOnChanges() {
    this.totalPage = Math.ceil((this.data.length / this.pageSive));
    console.log(this.data);
    this.dataSub = this.data;

    // this.onLoadDatePagitor();
  }

  ngOnInit() {
    this.currentPage = 1;
    // this.totalPage = Math.ceil((this.data.length / this.pageSive));
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
    // this.dataSub = this.data.filter((x, ix) => (this.currentPage - 1) * this.pageSive <= ix && ix < this.currentPage * this.pageSive);
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
