import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {
  model = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDeleteComponent>,
    private productService: ProductService,
  ) { dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.model = this.data;
  }

  handleEvent(ev) {
    console.log(ev);
    if (ev.value === 'cancel') {
      this.dialogRef.close();
    }
    if (ev.value === 'confirm') {
      this.deleteFunction();
    }
  }
  deleteFunction(): void {
    for (let i = 0; i < this.data.item.length; i++) {
      const element = this.data.item[i];
      this.productService.delete(this.data.item[i]).subscribe((res) => {
        if (i === (this.data.item.length - 1)) {
          this.dialogRef.close(true);
        }
      });
    }
  }
}
