import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { CategoryService } from 'src/app/services/category.service';
import { DistributorService } from 'src/app/services/distributor.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
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
    MediaURL: null,
    DistributorProducts: [],
    Manual: '2222'
  };
  option = {
    title: 'THÊM MỚI SẢN PHẨM',
    type: 'add',
    subtitle: 'THÔNG TIN CHUNG'
  };
  Ingradient = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  distributor = 0;
  toppings = new FormControl();
  arrayButton = [{
    class: 'btn-cancel',
    text: 'Hủy bỏ'
  },
  {
    class: 'btn-save',
    text: 'Chỉnh sửa'
  }];
  listGeneral = [];
  listDetal = [];
  lstCategory = [];
  lstStore = [{
    StoreId: 1,
    Name: '22222444'
  },
  {
    StoreId: 2,
    Name: '22222444'
  }];
  lstDistributor = [{
    DistributorId: 1,
    Name: '22222444'
  },
  {
    DistributorId: 2,
    Name: '22222444'
  }];


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
    this.listDetal = this.conFig.detal;
    if (this.data) {
      this.option = {
        title: 'THÔNG TIN SẢN PHẨM',
        type: 'edit',
        subtitle: 'THÔNG TIN CHUNG'
      };
    }
    this.getCategory();
    this.getStore();
    this.getDistributor();
  }
  getStore(): void {
    this.storeService.getStores(1, 500).subscribe(result => {
      this.lstStore = result;
    });
  }
  getCategory(): void {
    this.categoryService.getCategory(1, 500).subscribe(result => {
      this.lstCategory = result;
    });
  }
  getDistributor(): void {
    this.distributorService.getDistributor('', 1, 500).subscribe(result => {
      this.lstDistributor = result.payload;
    });
  }
  handleCallbackEvent = (value) => {
    console.log(value);

    switch (value.class) {
      case 'btn-cancel':
        this.cancel();
        break;
      case 'btn-save':
        this.save(value.data);
        break;
      default:
        break;
    }
    this.dialogRef.close();
  }
  addDistributor(): void {
    const distributorProduct = {
      DistributorId: this.distributor,
      Name: this.lstDistributor.find(x => x.DistributorId === this.distributor)?.Name,
      Type: 1,
      Status: 1,
      DistributorProductStores : this.lstStoreInput.map(res => {
        return {
          StoreId: res.StoreId,
          Name: this.lstStore.find(x => x.StoreId === res.StoreId)?.Name,
          Type: 1,
          Status: 1,
        };
      })
    };
    this.dataModel.DistributorProducts.push(distributorProduct);
    this.lstStoreInput = [];
    this.distributor = 0;
  }
  updateDistributor(index, type): void {
    if (type === 'edit') {
      this.distributor = this.dataModel.DistributorProducts[index].DistributorId;
      this.lstStoreInput = [];
      if (this.dataModel.DistributorProducts[index].DistributorProductStores) {
        this.dataModel.DistributorProducts[index].DistributorProductStores.forEach(res => {
          this.lstStoreInput.push(this.lstStore.find(x => x.StoreId === res.StoreId));
        });
      }
    }
    this.dataModel.DistributorProducts.splice(index, 1);
  }
  preview(files: File[]): void {
    console.log(files);
    this.dataModel.MediaURL = [];
    if (files.length !== 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < files.length; index++) {
        const reader = new FileReader();
        reader.readAsDataURL(files[index]);
        // tslint:disable-next-line:variable-name
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Ingradient.push({name: value});
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(fruit): void {
    const index = this.Ingradient.indexOf(fruit);

    if (index >= 0) {
      this.Ingradient.splice(index, 1);
    }
  }
  cancel = () => {
  }

  save = (value) => {
    this.dataModel = value;
  }

}
