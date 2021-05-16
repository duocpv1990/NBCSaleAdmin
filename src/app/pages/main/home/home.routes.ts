import { Routes } from "@angular/router";

import { HomeComponent } from './home.component';
import { HomeEnterpriseComponent } from './home-enterprise/home-enterprise.component';
import { HomeProductComponent } from './home-product/home-product.component';

export const homeRoute: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animation: 'isRight' },

    children: [
      {
        path: 'enterprise-list',
        component: HomeEnterpriseComponent
      },
      {
        path: 'product-list',
        component: HomeProductComponent
      }
    ]
  }
]
