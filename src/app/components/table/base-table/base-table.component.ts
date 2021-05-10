import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { map } from 'rxjs/operators';
import { TableModel } from 'src/app/models/base/table.model';

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss'],
})
export class BaseTableComponent implements OnInit, OnChanges {
  @Input() tableTitle;
  @Input() data: any;
  @Input() totalItems: any;
  @Output() callback = new EventEmitter();
  @Output() event1 = new EventEmitter();
  @Output() event2 = new EventEmitter();

  currentPage: number;

  constructor(private activatedRoute: ActivatedRoute,
    private route: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    this.totalItems = changes.totalItems.currentValue;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentPage = params['page_index'];
    });
  }



  handleEventRoute = (item) => {
    this.event1.emit({
      type: 'route',
      data: item,
    });
  };

  onDeleteItem = (item) => {
    this.callback.emit({
      type: 'delete',
      data: item,
    });
  };

  handlePageChange(e) {
    this.currentPage = e;
    this.event2.emit({
      type: 'next',
      data: e
    })
    const paginationQueryParams = {
      page_index: e,
    };
    this.route.navigate([], { queryParams: paginationQueryParams, queryParamsHandling: 'merge' });
  }
}

@NgModule({
  declarations: [BaseTableComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [BaseTableComponent],
})
export class BaseTableModule { }
