import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {MatSelectChange} from '@angular/material/select';
import * as _ from 'lodash';

@Component({
  selector: 'app-floor-repair',
  templateUrl: './floor-repair.component.html',
  styleUrls: ['./floor-repair.component.scss']
})
export class FloorRepairComponent implements OnInit {

  service;
  totalPrice = 0;
  hideServiceBtn = false;

  constructor(public data: DataShareService) { }

  ngOnInit(): void {
    console.log(this.data.serviceValue);
    for (const param of this.data.serviceValue.params){
      param.value = '';
    }
    this.service = this.data.serviceValue;
  }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'm2';
    }

    return value;
  }

  isInvalid(): boolean{
    for (const val of this.data.serviceValue.params){
      if (!val.value){
        return true;
      }
    }
    return false;
  }

  addService(): void {
    // dataShare.order.services.length
    const service: any = {};
    for (const param of this.data.serviceValue.params){
      service[param.key] = param.value;
      if (param.type === 'm2'){
        service.area = param.value;
      }
    }
    service.id = this.data.serviceValue.id;
    service.name = this.data.serviceValue.name;
    service.viewType = this.data.serviceValue.viewType;
    service.price = this.totalPrice;
    const material = _.find(this.data.serviceValue.params, {key: 'New Material'});
    service.key = material.value;
    this.data.order.services.push(service);
    this.data.calculateTotal();
    this.data.addFormVisible = !this.data.addFormVisible;
    this.hideServiceBtn = !this.hideServiceBtn;
  }

  selection($event: MatSelectChange, param): void {
    console.log('Has price', param.options[0]);
    if (param.options[0].price){
      // has price need to add
      for (const val of  param.options){
        if (val.value === $event.value){
          param.price = val.price;
        }
      }
    }
    this.calculatePrice();
  }

  calculatePrice(): void {
    const area = _.find(this.data.serviceValue.params, {type: 'm2'});
    const price = _.sumBy(this.data.serviceValue.params, 'price');
    this.totalPrice = area.value * price;
    console.log(area, price);
  }
}
