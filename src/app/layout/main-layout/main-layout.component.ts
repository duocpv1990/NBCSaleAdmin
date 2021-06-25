import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/app/utils/animations/fader.animation';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [
    // <-- add your animations here
    fader,
  ],
})
export class MainLayoutComponent implements OnInit {
  showFiller = false;

  dataNav = {
    list: [
      {
        icon: 'assets/img/home.svg',
        name: 'Trang chủ',
        linkURL: 'home',
      },
      {
        icon: 'assets/img/enterprise-code.svg',
        name: 'Doanh nghiệp',
        linkURL: 'enterprise',
      },
      {
        icon: 'assets/img/distributor.svg',
        name: 'Nhà phân phối',
        linkURL: 'distributor',
      },
      {
        icon: 'assets/img/shop.svg',
        name: 'Điểm bán',
        linkURL: 'shop',
      },
      {
        icon: 'assets/img/bag.svg',
        name: 'Sản phẩm',
        linkURL: 'product',
      },
    ],
  };
  constructor() { }

  ngOnInit(): void { }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
