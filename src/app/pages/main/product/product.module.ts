import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productRoute } from './product.routes';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoute),
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
