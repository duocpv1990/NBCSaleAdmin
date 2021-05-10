import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { productRoute } from './product.routes';
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BaseCardModule } from 'src/app/components/card/base-card/base-card.component';
import { FilterCardModule } from 'src/app/components/card/filter-card/filter-card.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoute),
    BaseCardModule,
    FilterCardModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }
