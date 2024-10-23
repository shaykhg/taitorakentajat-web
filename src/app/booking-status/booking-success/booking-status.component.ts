import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../services/util.service';
import {DataShareService} from '../../services/data-share.service';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.scss']
})
export class BookingStatusComponent implements OnInit {

  date = '28/04/2021';
  time = '00:00:00';
  // public bookingData: any;

  constructor(public data: DataShareService, public util: UtilService, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    // this.date = this.util.getHumanDateTime(this.data.order.date);
    // this.getBookingDetails();
  }
  //
  // getBookingDetails(): any {
  //   this.api.getBookingDetails(this.route.snapshot.params.id).subscribe( data => {
  //     console.log(data);
  //     this.bookingData =  data;
  //     this.date = this.util.getHumanDateTime(data.date);
  //   }, error => {
  //     console.log('An error occurred while getting details');
  //   });
  // }

}
