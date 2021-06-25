import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import readXlsxFile from 'read-excel-file';
import { ExcelModel } from 'src/app/models/excel.model';
import { ExcelService } from 'src/app/services/excel.service';
@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.component.html',
  styleUrls: ['./import-excel.component.scss']
})
export class ImportExcelComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data = '',
    private dialogRef: MatDialogRef<ImportExcelComponent>,
    private excelService: ExcelService) { }
    config = new ExcelModel();
    lstValue = [];
    type = 0;
  ngOnInit(): void {
    const input = document.getElementById('input-file');
    const schema =  this.config[this.data];
    input.addEventListener('change', () => {
      readXlsxFile((input as HTMLInputElement).files[0] , {schema}).then((rows) => {
        this.lstValue = rows.rows;
        console.log(rows, this.lstValue);
      });
    });
  }
  import(): void {
    this.excelService.import(this.lstValue, this.data).subscribe(res => {
      this.dialogRef.close(true);
    });
  }

}
@NgModule({
  declarations: [
    ImportExcelComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    ImportExcelComponent
  ]
})
export class ImportExcelModule { }
