import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-order-created',
  templateUrl: './order-created.component.html',
  styleUrls: ['./order-created.component.scss']
})
export class OrderCreatedComponent implements OnInit {

  panelOpenState = false;

  constructor(public data: DataShareService, public util: UtilService) { }

  ngOnInit(): void {
  }


  removeService(): any{
    this.data.order.services.splice(0, 1);
    this.data.calculateTotal();
  }

}
