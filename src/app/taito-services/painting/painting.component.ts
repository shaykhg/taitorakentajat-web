import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {MatSelectChange} from '@angular/material/select';
import * as _ from 'lodash';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss']
})
export class PaintingComponent implements OnInit {

  service;
  totalPrice = 0;
  hideServiceBtn = false;
  changeColor = false;

  constructor(public data: DataShareService) { }

  ngOnInit(): void {
    console.log(this.data.serviceValue);
    for (const param of this.data.serviceValue.params){
      if (!param.value && param.value !== false) {
        param.value = '';
      }
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
      if (!val.value && val.value !== false){
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
      if (param.key === 'Painting Area'){
        service.area = param.value;
      }
    }
    service.id = this.data.serviceValue.id;
    service.name = this.data.serviceValue.name;
    service.viewType = this.data.serviceValue.viewType;
    service.price = this.totalPrice;
    // const material = _.find(this.data.serviceValue.params, {key: 'Material'});
    // service.key = material.value;
    console.log(service);
    this.data.order.services.push(service);
    this.data.calculateTotal();
    this.data.addFormVisible = !this.data.addFormVisible;
    this.hideServiceBtn = !this.hideServiceBtn;
  }

  selection($event: MatSelectChange, param): void {
    // console.log('Has price', param.options[0]);
    if (param.options[0].price){
      // has price need to add
      for (const val of  param.options){
        if (val.value === $event.value){
          param.price = val.price;
        }
      }
    }
    console.log(param, $event);
    this.calculatePrice();
  }

  calculatePrice(): void {
    const area = _.find(this.data.serviceValue.params, {type: 'm2', key: 'Painting Area'});
    const groundwork = _.find(this.data.serviceValue.params, {key: 'Groundwork'});
    const ridge = _.find(this.data.serviceValue.params, {key: 'Ridge Height'});
    const downpipes = _.find(this.data.serviceValue.params, {key: 'Rainwater Downpipes'});
    const color = _.find(this.data.serviceValue.params, {key: 'Change Color'});
    const rainwater = _.find(this.data.serviceValue.params, {key: 'Rainwater Renewal'});
    console.log('Rainwater', rainwater.value && !isNaN(rainwater.value));
    if (rainwater.value && !isNaN(rainwater.value)){
      if (rainwater.value > 150){
        // increase 10m2
        let diff = rainwater.value - 150;
        diff = (diff % 10) + diff;
        rainwater.total = 1104 + (diff / 10) * 10;
      } else {
        // decrease 6m2
        let diff = 150 - rainwater.value;
        diff = (diff % 10) + diff;
        rainwater.total = 1104 - (diff / 10) * 6;
      }
      console.log('Rainwater', rainwater);
    }
    if (ridge.value){
      ridge.total = ridge.value * ridge.price;
    }
    if (downpipes.value){
      downpipes.total = downpipes.value * downpipes.price;
    }
    groundwork.total = groundwork.price * area.value;
    area.total = area.price * area.value;
    const price = _.sumBy(this.data.serviceValue.params, 'total');
    this.totalPrice = price;
    if (color.value){
      this.totalPrice = this.totalPrice + (color.price / 100) * price;
    }
    console.log(this.totalPrice.toFixed(2));
  }

  changedBoolean(param: any, $event: MatSlideToggleChange): void {
      console.log(param, $event);
      const valid = param.key === 'Wooden Parts Change';
      if (param.value && valid){
        param.total = param.price;
      }
      this.calculatePrice();
  }
}
