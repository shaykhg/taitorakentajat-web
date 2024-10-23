import {Component, OnInit} from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {
  public disableProduct = false;
  public disableBuyProduct = false;
  public products = [];
  servicePrice: any = 0;
  packagePrice: any;
  sortVisible = true;
  filters = {
    sort: {
      price: '',
      name: ''
    },
    brands: []
  };

  // {"order":["price DESC"],"limit":3}

  constructor(public dataShare: DataShareService, private api: ApiService) {
  }

  ngOnInit(): void {

    console.log(this.dataShare.order.totalPrice);
    // this.getApiPackages();
  }

  //
  // getApiPackages(): any {
  //   this.api.getPackages().subscribe(data => {
  //       console.log('This Is Package Data', data);
  //       this.products = data;
  //       console.log('DataShare Package::', this.dataShare.order.package);
  //     },
  //     error => console.log(error.massage));
  // }


  disablePackage($event, type: number): any {
    console.log($event);

    if (type === 1) {
      this.disableProduct = $event.checked;
      this.dataShare.order.productHandle.buySelf = this.disableProduct || false;
      console.log(this.dataShare.order.productHandle.buySelf);
      this.dataShare.order.packages = [];
      this.dataShare.calculateTotal();
    } else if (type === 2) {
      this.disableBuyProduct = $event.checked;
      this.dataShare.order.productHandle.assist = this.disableBuyProduct || false
      this.dataShare.order.packages = [];
      this.dataShare.calculateTotal();
    }

  }

  // buyProduct($event): any {
  //   console.log($event);
  //
  // }


  moveNextTab(): void {
    this.dataShare.step.selectPackages = true;
    this.dataShare.tabChange.next(2);
    // setTimeout(() => this.dataShare.tabIndex = 2, 300);
  }

  disableBtn(): any {
    if (!this.disableProduct && !this.disableBuyProduct && !this.dataShare.getCheckValue) {
      return true;
    }
  }

  movePrevTab(): void {
    this.dataShare.tabIndex = 0;
    console.log('Tab index changed', this.dataShare.tabIndex);
  }


}
