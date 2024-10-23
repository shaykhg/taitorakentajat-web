import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UtilService} from '../services/util.service';
import {DataShareService} from '../services/data-share.service';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';
import {MatDialog} from '@angular/material/dialog';
import {AppConstants} from '../AppConstants';
import {ImageViewerComponent} from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  public order;
  private id = '';

  constructor(private route: ActivatedRoute, private api: ApiService, public util: UtilService, public data: DataShareService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getOrderDetails(this.id);
      // In a real app: dispatch action to load the details here.
    });

  }

  openDialog(url): void {
    console.log('Clicked here', url);
    const dialogRef = this.dialog.open(ImageViewerComponent, {
      width: '550px',
      data: {title: AppConstants.BASE_URL + url}
    });
  }

  getOrderDetails(id: string): void{
    this.api.getBookingDetails(id).subscribe(async data => {
      const packs = data.packages;
      let services = data.services;
      if (packs){
        services = _.map(services, service => {
          console.log('Service inout', service);
          if (service.package) {
            service.packages = this.findProducts(service.package, packs);
          }
          return service;
        });
      }
      this.order = data;
      this.order.services = services;
      console.log('myOrder', data);
    }, error => {
      console.log(error.message);
      this.util.presentSnackBar('Error while getting order');
    });
  }

   findProducts(input, packages): any[]{
    const products = [];
    for (const item of input){
      const packs = _.find(packages, {id: item});
      products.push(packs);
    }

    return products;
  }

}
