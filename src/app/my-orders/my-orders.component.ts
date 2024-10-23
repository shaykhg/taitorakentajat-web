import { Component, OnInit } from '@angular/core';
import {SessionService} from '../services/session.service';
import {UtilService} from '../services/util.service';
import {ApiService} from '../services/api.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders = [];
  constructor(private router: Router, public session: SessionService, public util: UtilService, private api: ApiService) { }

  ngOnInit(): void {
    this.getBookingsData();
  }

  getBookingsData(): void {
    console.log(this.session.getToken());
    this.api.getMyBookings().subscribe(data => {
      console.log('Get Bookings', data);
      this.orders = _.map(data, item => {
        const mItem = item;
        console.log('Current', item);
        mItem.disDate = this.util.getIndianDate(item.date);
        mItem.disTime = this.util.getTime(item.date);
        mItem.disServices = item.services ? (item.services.length > 1 ?
          `${item.services[0].name} and ${item.services.length - 1} more` :
          item.services[0].name) : 'No Service Selected';
        return mItem;
      });
    }, error => {
      console.log(error.message);
      this.util.presentSnackBar(error.message);
    });
  }


  orderDetails(order: any): void {
    // this.data.currentOrder = order;
    this.router.navigateByUrl('/order-details/' + order.id);
  }

}
