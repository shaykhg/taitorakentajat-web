import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataShareService} from '../services/data-share.service';
import * as moment from 'moment';
import {SessionService} from '../services/session.service';
import {MatTabGroup} from '@angular/material/tabs';
import {MatStepper} from '@angular/material/stepper';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isLinear = false;
  panelOpenState = false;
  serviceDetail = this.dataShare.serviceDetail;
  // service = this.dataShare.service;
  servicePrice = 0;
  url = '';
  packagePrice = 0;
  renovationDate;
  @ViewChild('stepper', {static: false}) stepper: MatStepper;



  constructor( public dataShare: DataShareService, private session: SessionService, private route: ActivatedRoute, public util: UtilService) {}

  ngOnInit(): void {
    moment(this.dataShare.selectedDate).format('DD/MM/YYYY');
    this.route.queryParams.subscribe(data => {
      this.url = data.url;
    });
    console.log('********', this.dataShare.companySize);
    console.log('********', this.url);
  }

  ngAfterViewInit(): void {
    this.dataShare.tabChange.subscribe(num => {
      console.log('Got Update to change tab', num);
      if (num !== this.stepper.selectedIndex){
        setTimeout(() => this.stepper.selectedIndex = num, 100);
      }
    });
  }




}
