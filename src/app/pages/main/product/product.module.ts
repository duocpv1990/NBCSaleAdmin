import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productRoute } from './product.routes';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { CreateModule } from 'src/app/components/create/create.component';
import { EditModule } from 'src/app/components/edit/edit.component';
import { DeleteModule } from 'src/app/components/dialog/delete/delete.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, ProductUpdateComponent, ProductDeleteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoute),
    FilterBaseModule,
    TableBaseModule,
    CreateModule,
    EditModule,
    FormsModule,
    DeleteModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule
  ],
  exports: [ProductComponent, MatChipsModule]
})
export class ProductModule { }
