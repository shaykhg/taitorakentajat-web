import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {DataShareService} from '../services/data-share.service';
import {UtilService} from '../services/util.service';
import * as moment from 'moment';
import {FormBuilder, Validators} from '@angular/forms';
import {SessionService} from '../services/session.service';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {


  constructor(private session: SessionService, private api: ApiService, public data: DataShareService, private utils: UtilService, private formBuilder: FormBuilder, private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('en-GB');

  }

  get f(): any{
    return this.contactUs.controls;
  }
  clickEvent = 'click';
  selectedSlot;
  hideForm = false;
  hideCal = false;
  renoDate;
  public slots = [];
  slotId: any;
  public timeSlot = [];
  daysRequired = 6;
  currentDate = moment();

  public contactUs = this.formBuilder.group({
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    email: ['', [Validators.required, Validators.email]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
  });
  serviceMan: any;

  public myFilter = (d: Date | null): any => {
    return moment(d).isAfter(moment());
  }

  ngOnInit(): void {
    this.data.customerReady.subscribe(ready => {
      if (ready) {
        // form is ready we can get slots now
        this.getSlotTime();
      }
    });
    console.log(this.data.selectedDate);
    this.getSlotTime();




  }

  /**
   * Get next or previous slots
   * @param startDate Start date which you want to use for starting the slots
   * @param reverse Reverse is the flag which is use to run backward
   */
  getNextSlots(startDate: any, reverse: boolean): void {
    const mStart = startDate.clone();
    if (reverse){
      mStart.subtract(6, 'days');
    }
    this.timeSlot = [];
    for (let i = 0; i <= this.daysRequired; i++){
      const cur = mStart.clone().add(i, 'days').startOf('day');
      this.timeSlot.push({
        day: cur.format('dddd') + ' ' + cur.format('DD.MM'),
        date: cur,
        slots: this.isSlotExists(cur),
      });
    }

    console.log(this.timeSlot, '7d');
  }



  // getSlotTime(): any {
  //   this.api.getSlots(this.data.order.customerDetails.city).subscribe(data => {
  //     console.log(data);
  //     this.slots = this.utils.groupBy(data, 'date', 'date', 'slots');
  //     for (const slot of this.slots) {
  //       slot.date = moment(slot.date).format('dddd') + ' ' + moment(slot.date).format('MM.DD');
  //       for (const mSlot of slot.slots) {
  //         mSlot.label = moment(mSlot.start).format('HH:mm');
  //       }
  //     }
  //     console.log(this.slots);
  //   });
  // }

  getSlotTime(): any {
    this.api.getSlots(this.data.order.customerDetails.city).subscribe(data => {
      console.log(data);
      this.slots = this.utils.groupBy(data, 'date', 'date', 'slots');
      for (const slot of this.slots) {
        console.log('Slot date', slot.date);
        slot.mDate = moment(slot.date);
        slot.date = moment(slot.date).format('dddd') + ' ' + moment(slot.date).format('DD.MM');
        console.log(slot.mDate);
        for (const mSlot of slot.slots) {
          mSlot.label = moment(mSlot.start).format('HH:mm');
        }
      }

      // This is used to combine it with 7 day data
      this.getNextSlots(moment().startOf('day'), false);
    });
  }

  isSlotExists(date: any): any{
    for (const item of this.slots){
      if (date.isSame(item.mDate, 'day')){
        return item.slots;
      }
    }
    return  [];
  }


  moveNextTab(): void {
    console.log('this is contactus form', this.contactUs.value);
    if (this.contactUs.valid && this.hideForm){
      this.data.order.timeNotFound = true;
      this.onSubmit();

    } else {
      this.data.slotId = this.slotId;
      this.data.serviceMan = this.serviceMan;
      this.data.slot = this.selectedSlot;
    }
    this.data.step.selectTime = true;
    this.data.tabChange.next(3);
  }

  setSlot(slot): void {
    this.selectedSlot = slot;
    this.slotId = slot.id;
    this.serviceMan = slot.user.id;
    this.data.addSlot = this.selectedSlot.date;
    console.log(this.data.addSlot);
  }

  selectRenovation($event): any {
    this.data.renovationTime = $event.checked;
    console.log($event);
    if ($event.checked) {
      this.hideCal = true;
    } else if (!$event.checked) {
      this.hideCal = false;
    }

  }

  onSubmit(): any {
    this.data.order.scheduleContactForm = this.contactUs.value;
    console.log('**********', this.contactUs.value);
    this.data.updateForms.next(this.data.order.scheduleContactForm);

  }

  moveBack(): any {
    console.log('this is current tab', this.data.tabIndex);

    this.data.tabIndex = 2;
    setTimeout(() => {
    this.data.tabIndex = 1;
      }, 300);
    console.log('this is current tab', this.data.tabIndex);

    // this.data.tabIndex = 1;
    // console.log('this is current tab', this.data.tabIndex);

  }

  showForm(): any {
    this.contactUs.reset();
    if (this.session.isLoggedIn) {
      this.contactUs.get('email').setValue(this.session.getUser().email);
    }
    this.hideForm = ! this.hideForm;
  }
}
