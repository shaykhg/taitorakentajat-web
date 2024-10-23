import {Component, Input, OnInit} from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {ApiService} from '../../services/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-service-added',
  templateUrl: './service-added.component.html',
  styleUrls: ['./service-added.component.scss']
})
export class ServiceAddedComponent implements OnInit {


  panelOpenState = false;

  constructor(public data: DataShareService, public api: ApiService) {
  }

  ngOnInit(): void {
  }



  removeService(service): any{
    this.data.order.services = _.filter(this.data.order.services, item => {return item.id !== service.id; });
    this.data.calculateTotal();
  }

  getServiceProps(service): any[]{
    let arr = Object.keys(service).map(key => ({ key, value: service[key] }));
    arr = _.filter(arr, (obj) => (obj.key !== 'id' && obj.key !== 'viewType' && obj.key !== 'area'));
    service.arr = arr;
    return arr;
  }

}
