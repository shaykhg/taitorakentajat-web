import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DataShareService} from '../../services/data-share.service';
import * as _ from 'lodash';
import {UtilService} from '../../services/util.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {identity} from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() service: any;
  packages = [];
  moreSection = false;

  isShown = false ;
  sortVisible = true;
  filters = {
    sort: {
      price: '',
      name: '',
      discount: ''
    },
    brands: [],
    range: 0.00,
    applied: false
  };
  allPackages = [];

  constructor(public util: UtilService, private api: ApiService, public data: DataShareService) { }

  ngOnInit(): void {
    this.getProductPackages();
  }
  /**
   * Get product packages
   */
  getProductPackages(): void{
    console.log('serviceId', this.service.id);
    this.api.getPackages(this.service.id, this.service.key).subscribe(data => {
      this.packages = data;
      this.packages.forEach( item => {
        console.log(item);
        item.price = this.util.roundTo(_.sumBy(item.products, product => {
          console.log(product.fixed ? product.price : product.price * this.service.area, product);
          if (product.fixed){
            return product.price;
          } else {
            if (product.metreSquare){
              // Need to calculate per given metres square instead of per meter2
              const total = Math.ceil(this.service.area / product.metres);
              // This works like this if a box is needed for 10m2 it will do 45m2/10 = 4.5 => 5 -> 5*price
              return product.price * total;
            } else {
              return product.price * this.service.area;
            }
          }        }), 2);
        if (item.discount > 0){
          // calculate discount
          const discAmt = (item.discount / 100) * item.price;
          item.oldPrice = item.price;
          item.price = item.price - discAmt;
        }
        const brands = _.map(item.products, 'brand'); // [Asian Paints, Some other brand, ...]
        this.filters.brands = _.union(this.filters.brands, brands);
        console.log('Brand', brands);
        item.expanded = false;
      });
      this.allPackages = [];
      this.allPackages = [...this.packages];
      this.filters.brands = _.map(this.filters.brands, brand => {
        return {name: brand, checked: false};
      });
      this.packages = _.orderBy(this.packages, 'discount', 'desc');
    });
  }

  /**
   * This function called on check/uncheck of package
   * @param $event This is the MatCheckBoxEvent
   * @param pack This is the package itself which is being checked
   */
  getPackageValue($event, pack): void{
    this.data.getCheckValue = $event.checked;
    if ($event.checked){
      // Add Package in order
      for (const service of this.data.order.services){
        if (service.id === this.service.id){
          if (service.package){
            service.package.push(pack.id);
          } else {
            service.package = [pack.id];
          }
          break;
        }
      }
      console.log('Services', this.data.order.services);
      this.data.order.packages.push(pack);
      this.data.calculateTotal();
      console.log(this.data.order.packages);
    } else {
      // Remove Package in order
      _.remove(this.data.order.packages, {id: pack.id});
      for (const service of this.data.order.services){
        if (service.id === this.service.id){
          console.log('Filter Services', service, this.data.order.services);
          // console.log('Filter', this.data.order.services.package);
          service.package = service.package.filter(e => e !== pack.id);
          break;
        }
      }
      console.log('Services', this.data.order.services);
      this.data.calculateTotal();
    }
  }

  /**
   * Add applied sort
   * @param property Property of the product
   * @param sort Type of sort ASC|DESC
   */

  addSort(property?: string, sort?: string): void {
    console.log('this is service id', this.service);
    if (property && sort) {
      console.log('Already applied', this.filters.sort[property] === sort);
      this.filters.sort[property] = this.filters.sort[property] === sort ? 'NONE' : sort;
      this.filters.applied = true;
    }
    const fields = [];
    const sortType = [];
    if (this.filters.sort.price !== 'NONE'){
      fields.push('price');
      sortType.push(this.filters.sort.price.toLowerCase());
    }

    if (this.filters.sort.name !== 'NONE'){
      fields.push('name');
      sortType.push(this.filters.sort.name.toLowerCase());
    }

    if (this.filters.sort.discount !== 'NONE'){
      fields.push('discount');
      sortType.push(this.filters.sort.discount.toLowerCase());
    }


    if (fields.length > 0) {
      for (let i = 0; i < fields.length; i++) {
        if (sortType[i] === ''){
          fields[i] = '';
        }
      }
      console.log('Sort Done', fields, sortType);
      this.packages = _.orderBy(this.packages, fields, sortType);
    } else {
      console.log('No Sorting has been applied!');
    }
  }

  /**
   * Apply all applied filters on packages
   */
  addFilter(): void {
    this.filters.applied = true;
    console.log(this.filters);
    let brands = _.filter(this.filters.brands, item => item.checked);
    if (brands.length === 0){
      brands = this.filters.brands;
    }
    this.packages = _.filter(this.allPackages, item => {
      const range = this.filters.range === 0 ? true : (item.price <= this.filters.range);
      let hasBrand = false;
      for (const prod of item.products){
        if (_.findIndex(brands, ['name', prod.brand]) > -1){
          hasBrand = true;
          break;
        }
      }
      return (range && hasBrand);
    });
    this.addSort();
  }



  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  /**
   * Clear all applied filters
   */
  clearFilters(): void {
    this.filters = {
      sort: {
        price: '',
        name: '',
        discount:  ''

      },
      brands: _.map(this.filters.brands, item => {
        item.checked = false;
        return item;
      }),
      range: 0.00,
      applied: false
    };
    this.packages = [];
    this.packages = [...this.allPackages];
  }

}
