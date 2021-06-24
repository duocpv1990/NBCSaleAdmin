import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shop-delete',
  templateUrl: './shop-delete.component.html',
  styleUrls: ['./shop-delete.component.scss']
})
export class ShopDeleteComponent implements OnInit {
  model = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ShopDeleteComponent>,
    private storeService: StoreService

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
  deleteFunction() {
    for (let i = 0; i < this.data.item.length; i++) {
      const element = this.data.item[i];
      this.storeService.delete(this.data.item[i]).subscribe((res) => {
        if (i === (this.data.item.length - 1)) {
          this.dialogRef.close(true);
        }
      });
    }
  }
}
