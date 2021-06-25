import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { StoreService } from 'src/app/services/store.service';
import { CategoryService } from 'src/app/services/category.service';
import { DistributorService } from 'src/app/services/distributor.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProductService } from 'src/app/services/product.service';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import { CertificateEnterpriseComponent } from '../../enterprise/certificate-enterprise/certificate-enterprise.component';
import { CertificationService } from 'src/app/services/certification.service';
import { FormatDateService } from 'src/app/services/format-date.service';
import { EnterpriseService } from 'src/app/services/enterprise.service';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent extends BaseUploadComponent implements OnInit {
  conFig = new Product();
  // dataModel = {
  //   barcode: '222',
  //   productName: '222',
  //   price: 234,
  //   category: 1,
  //   MediaURL: null,
  //   DistributorProducts: [],
  //   Manual: '2222'
  // };
  dataModel;
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
    text: 'Lưu'
  }];
  listGeneral = [];
  listDetal = [];
  lstCompany = [];
  lstTarget = [];
  lstCategory = [];
  lstStore = [];
  lstDistributor = [];


  lstStoreInput = [];
  lstTargetInput = [];

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
    private enterpriseService: EnterpriseService,
    private distributorService: DistributorService,
    private productService: ProductService,
    public s3Service: S3FileService,
    private dialogCer: MatDialog,
    private certificationService: CertificationService,
    private serviceDate: FormatDateService
  ) {
    super(s3Service);
  }

  ngOnInit(): void {
    this.listDetal = this.conFig.img;
    if (this.data && this.data.ProductId) {
      this.dataModel = this.data;
      if (this.dataModel.Ingredient) {
        this.Ingradient = this.dataModel.Ingredient.split(',');
      }
      this.dataModel.ProductCertifications = this.dataModel.ProductCertifications.map(cer => {
        return {
          CertificationId: cer.CertificationId,
          Name: cer.Name,
          Status: cer.Status,
          ExpiredDate: (cer.ExpiredDate !== null) ? this.serviceDate.formatDate(cer.ExpiredDate, 'MM/DD/YYYY') : '',
          CertificationMedias: cer.CertificationMedias.map(media => {
            return {
              str: media.MediaURL.substring(media.MediaURL.lastIndexOf('/') + 1),
              MediaURL: media.MediaURL,
              Type: media.Type,
              Status: media.Type
            };
          }),
        };
      });
      console.log(this.dataModel);
      this.option = {
        title: 'CHỈNH SỬA THÔNG TIN SẢN PHẨM',
        type: 'edit',
        subtitle: 'THÔNG TIN CHUNG'
      };
      this.arrayButton = [{
        class: 'btn-cancel',
        text: 'Hủy bỏ'
      },
      {
        class: 'btn-save',
        text: 'Chỉnh sửa'
      }];
    } else {
      this.dataModel = this.data;
    }
    this.getCategory();
    this.getStore();
    this.getDistributor();
    this.getCompany();
  }

  getStore(): void {
    this.enterpriseService.getEnterprise('', '', 1, 500, '', '').subscribe(result => {
      this.lstCompany = result.payload;
    });
    this.enterpriseService.getTarget().subscribe(result => {
      this.lstTarget = result;
      this.lstTarget.forEach(element => {
        this.dataModel.TargetMarketIdList.forEach(TargetMarketId => {
          if (TargetMarketId === element.TargetMarketId) {
            this.lstTargetInput.push(element);
          }
        });
      });
    });
  }
  getCompany(): void {
    this.storeService.getStores('', '', '', 1, 500).subscribe(result => {
      this.lstStore = result.payload;
    });

  }
  getCategory(): void {
    this.categoryService.getCategory(1, 500).subscribe(result => {
      this.lstCategory = result;
    });
  }
  getDistributor(): void {
    this.distributorService.getDistributor('', 1, 500, '').subscribe(result => {
      this.lstDistributor = result.payload;
    });
  }
  handleCallbackEvent = (value) => {
    console.log(value);
    if (value === 'btn-save') {
      this.save();
    } else {
      this.dialogRef.close();
    }
    // switch (value.class) {
    //   case 'btn-cancel':
    //     this.cancel();
    //     break;
    //   case 'btn-save':
    //     this.save(value.data);
    //     break;
    //   default:
    //     break;
    // }
  }
  showAdd(): void {
    this.openAddCetificate(this.dataModel?.ProductId);
  }
  openAddCetificate(ProductId): void {
    this.dialogCer.open(CertificateEnterpriseComponent, {
      width: '940px',
      height: '843px',
      data: ProductId
    }).afterClosed().subscribe(result => {
      if (result.text === 'Lưu') {
        const req =
        {
          Name: result.data['name-full'],
          ExpiredDate: result.data.date,
          Type: 1,
          Status: result.data.status,
          CertificationMedia: result.data.CertificationMedia
        };
        this.certificationService.add(req).subscribe(res => {
          this.dataModel.ProductCertifications.push(
            {
              CertificationId: +res,
              Name: result.data['name-full'],
              ExpiredDate: result.data.date,
              Type: 1,
              Status: result.data.status,
              CertificationMedias: result.data.CertificationMedia.map(media => {
                return {
                  str: media.MediaURL.substring(media.MediaURL.lastIndexOf('/') + 1),
                  MediaURL: media.MediaURL,
                  Type: media.Type,
                  Status: media.Type
                };
              }),
            }
          );
          console.log(this.dataModel);

        });
      }
    });
  }
  addDistributor(): void {
    const distributorProduct = {
      DistributorId: this.distributor,
      Name: this.lstDistributor.find(x => x.DistributorId === this.distributor)?.Name,
      Type: 1,
      Status: 1,
      DistributorProductStores: this.lstStoreInput.map(res => {
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
    this.multipleUpload(files).subscribe(res => {
      this.dataModel.checkMediaUrl = true;
      this.dataModel.ProductMedias = this.fileLinkList.map(x => {
        return {
          ProductId: this.dataModel?.ProductId,
          MediaURL: x,
          Status: 1,
          Type: 3
        };
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.Ingradient.push(value);
      this.dataModel.Ingredient = this.Ingradient.toString();
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
      this.dataModel.Ingredient = this.Ingradient.toString();
    }
  }
  cancel = () => {
  }

  save = () => {
    this.dataModel.CertificationIdList = this.dataModel.ProductCertifications.map(x => {
      return x.CertificationId;
    });
    this.dataModel.TargetMarketIdList = this.lstTargetInput.map(x => {
      return x.TargetMarketId;
    });
    if (this.dataModel && this.dataModel.ProductId) {
      if (this.dataModel.checkMediaUrl === true) {
        for (let i = 0; i < this.dataModel.ProductMedias; i++) {
          this.productService.updateImage( this.dataModel.ProductMedias[i]).subscribe(res => {
            if (i === this.dataModel.ProductMedias.length - 1) {
              this.productService.edit(this.dataModel.ProductId, this.dataModel).subscribe(res2 => {
                this.dialogRef.close(true);
              });
            }
          });

        }
      } else {
        this.productService.edit(this.dataModel.ProductId, this.dataModel).subscribe(res => {
          this.dialogRef.close(true);
        });
      }
    } else {
      this.productService.add(this.dataModel).subscribe(res => {
        this.dialogRef.close(true);
      });
    }
  }

}
