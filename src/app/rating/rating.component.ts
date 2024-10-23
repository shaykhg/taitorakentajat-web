import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  bookingId = '';
  booking: any;
  rate = 0;
  submit = false;
  userId = '';

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.params.booking;
    this.userId = this.route.snapshot.params.user;

    this.getBooking();
  }

  getBooking(): void{
    this.api.checkExistingReview(this.bookingId).subscribe(booking => {
      this.booking = booking;
      console.log('this is booking detail', this.booking);
    }, error => {
      console.log('An error occurred!', error);
    });
  }

  postReview(comment): any{
    const body = {
      // name: this.booking.fname + ' ' + this.booking.lname,
      review: comment,
      rating: this.rate,
      type: 'customer',
      date: new Date(),
      // company: this.booking.company,
       bookingId: this.bookingId,
      userId: this.userId,
    };
    console.log('this is body', body);
    this.api.postReview(body).subscribe( review => {
      this.submit = true;
      console.log('this is posted review data', review);
    }, error => {
      console.log('An error occurred while posting review', error);
    });
  }

}
