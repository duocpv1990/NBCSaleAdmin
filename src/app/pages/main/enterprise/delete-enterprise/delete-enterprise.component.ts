import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnterpriseService } from 'src/app/services/enterprise.service';

@Component({
  selector: 'app-delete-enterprise',
  templateUrl: './delete-enterprise.component.html',
  styleUrls: ['./delete-enterprise.component.scss']
})
export class DeleteEnterpriseComponent implements OnInit {
  model = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteEnterpriseComponent>,
    private enterpriseService: EnterpriseService,
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
    for (let i = 0; i < this.data.item.length; i++) {
      const element = this.data.item[i];
      this.enterpriseService.delete(this.data.item[i]).subscribe((res) => {
        if (i === (this.data.item.length - 1)) {
          this.dialogRef.close(true);
        }
      });
    }
  }

}
