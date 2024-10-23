import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';

@Component({
  selector: 'app-customer-time-slot',
  templateUrl: './customer-time-slot.component.html',
  styleUrls: ['./customer-time-slot.component.scss']
})
export class CustomerTimeSlotComponent implements OnInit {

  constructor(public data: DataShareService) { }

  ngOnInit(): void {
  }

}
