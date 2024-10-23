import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-booking-failed',
  templateUrl: './booking-failed.component.html',
  styleUrls: ['./booking-failed.component.scss']
})
export class BookingFailedComponent implements OnInit {

  date = '28/04/2021';
  time = '00:00:00';

  constructor(public data: DataShareService, private util: UtilService) { }

  ngOnInit(): void {
    this.date = this.util.getHumanDateTime(this.data.order.date);
  }

}
