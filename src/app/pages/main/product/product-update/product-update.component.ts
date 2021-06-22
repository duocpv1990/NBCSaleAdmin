import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { CategoryService } from 'src/app/services/category.service';
import { DistributorService } from 'src/app/services/distributor.service';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  conFig = new Product();
  dataModel = {
    barcode: '222',
    productName: '222',
    price: 234,
    category: 1,
    MediaURL: null
  };
  option = {
    title: 'THÊM MỚI SẢN PHẨM',
    type: 'add',
    subtitle: 'THÔNG TIN CHUNG'
  };
  lst = [];
  category = 0;
  toppings = new FormControl();
  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Chỉnh sửa'
  }];
  listCreate = [];
  listGeneral = [];
  listDetal = [];
  lstCategory = [];
  lstStore = [];
  lstDistributor = [];


  lstStoreInput = [];

  // toppingList = [
  //   {
  //     id: 1,
  //     desc: 'name name name name name'
  //   },
  //   {
  //     id: 2,
  //     desc: 'name33 name33 name33 name33'
  //   }
  // ];
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductUpdateComponent>,
    private categoryService: CategoryService,
    private storeService: StoreService,
    private distributorService: DistributorService,
  ) { }

  ngOnInit(): void {
    // this.dataModel = this.data;
    this.listGeneral = this.conFig.general;
    this.listDetal = this.conFig.detal;
    if (this.data) {
      this.option = {
        title: 'THÔNG TIN SẢN PHẨM',
        type: 'edit',
        subtitle: 'THÔNG TIN CHUNG'
      };
    }
  }

  handleCallbackEvent = (value) => {
    console.log(value);

    switch (value.class) {
      case 'btn-cancel':
        this.cancel();
        break;
      case 'btn-save':
        this.save(value.data)
        break;
      default:
        break;
    }
    this.dialogRef.close();
  }

  preview(files: File[]): void {
    console.log(files);
    this.dataModel.MediaURL = [];
    if (files.length !== 0) {
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        reader.onload = (_event) => {
          this.dataModel.MediaURL.push(reader.result);
        };
      }
      // const reader = new FileReader();
      // reader.readAsDataURL(files[0]);
      // reader.onload = (_event) => {
      //   this.dataModel.MediaURL = reader.result;
      // }
    }
  }
  cancel = () => {
  }

  save = (value) => {
    this.dataModel = value;
  }

}
