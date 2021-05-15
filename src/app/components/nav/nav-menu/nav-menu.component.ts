import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  @Input() dataNavMenu;
  isActive: number;

  constructor() { }

  ngOnInit(): void { }
}


@NgModule({
  declarations: [NavMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatListModule,],

  exports: [NavMenuComponent],
})
export class NavComponentModule { }