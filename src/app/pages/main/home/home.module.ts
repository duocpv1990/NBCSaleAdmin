import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { homeRoute } from './home.routes';
import { HomeComponent } from './home.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { HomeEnterpriseComponent } from './home-enterprise/home-enterprise.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { FilterBaseModule } from 'src/app/components/filter/filter.component';
import { TableBaseModule } from 'src/app/components/table/table.component';
import { HomeNotificationComponent } from './home-notification/home-notification.component';
import { SettingModule } from './setting/setting.module';



@NgModule({
  declarations: [HomeComponent, HomeEnterpriseComponent, HomeProductComponent, HomeNotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoute),
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FilterBaseModule,
    TableBaseModule,
    SettingModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
