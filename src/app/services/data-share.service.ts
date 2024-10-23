import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  // It will be used to know whether customer form is filled or not
 public customerReady: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 public tabChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  order: any = {
    property: {
      type: '0',
      size: 0
    },
    services: [],
    packages: [],
    time: {},
    customerDetails: {
      city: 'helsinki',
      propertyType: '',
      propertySize: '',
      street: '',
      building: '',
      postCode: '',
      experienceLevel: '',
      companySize: ''
    },
    images: [],
    productHandle: {
      buySelf: false,
      assist: false
    },
    totalPrice : 0,

    timeNotFound : false,

    scheduleContactForm: {
      phone: '',
      email: '',
      date: new Date(),
      time: ''
    }

  };

  public editUserData;
  public slotId;
  public serviceMan;
  public addSlot;
  public addFormVisible = true;
  public userName;
  public selectedDate = moment().startOf('day').add(1, 'day').toDate();
  public contactDate = moment().startOf('day').add(1, 'day').toDate();

  public serviceDetail;

  public companySize;

  public experienceLevel;

  public serviceData;

  public apiService;
  getCheckValue;

  public renovationTime;

  public serviceValue;

  public tabIndex = 0;
  loading = false;
  step = {
    addService : false,
    selectPackages: false,
    selectTime: false,
    placeOrder: false
  };
  slot: any;
  serviceTotal = 0;
  updateForms = new BehaviorSubject({});

  tempService: any;

  constructor() { }


  /**
   * This function can be used to make the total the order at any point of time
   */
  calculateTotal(): void {
    console.log(this.order.services, 'Prices');
    const servicePrice = _.sumBy(this.order.services, (o) => o.price);
    const packagePrice = _.sumBy(this.order.packages, (o) => o.price);
    this.order.totalPrice = servicePrice + packagePrice;
  }

  setRenoDate(): string{
    return moment(this.selectedDate).format('DD-MMM-YYYY');
  }

}
