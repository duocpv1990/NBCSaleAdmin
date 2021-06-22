import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DistributorService } from 'src/app/services/distributor.service';

@Component({
  selector: 'app-delete-distributor',
  templateUrl: './delete-distributor.component.html',
  styleUrls: ['./delete-distributor.component.scss']
})
export class DeleteDistributorComponent implements OnInit {
  model = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteDistributorComponent>,
    private distributorService: DistributorService,
  ) { dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.model = this.data;
  }
  handleEvent(ev): void {
    console.log(ev);
    if (ev.value === 'cancel') {
      this.dialogRef.close();
    }
    if (ev.value === 'confirm') {
      this.deleteFunction();
    }
  }
  deleteFunction(): void {
    this.distributorService.delete(this.data.item).subscribe((res) => {
      this.dialogRef.close(true);
    });
  }

}
