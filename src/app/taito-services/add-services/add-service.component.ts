import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Service} from '../../models/service';
import {DataShareService} from '../../services/data-share.service';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {UtilService} from '../../services/util.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {


  @Input() url = '';
  // public serviceValue: '';
  public fresh;
  public intermediate;
  public size;
  serviceExists = false;
  postcodeError = false;
  services: Service[] = [
    {value: 'exterior-painting-50€', id: '1', viewValue: 'Exterior Painting'},
    {value: 'roof-renovation-50€', id: '2', viewValue: 'Roof Renovation'},
    {value: 'bathroom-renovation-50€', id: '3', viewValue: 'Bathroom Renovation'},
    {value: 'sauna-renovation-50€', id: '4', viewValue: 'Sauna Renovation'},
    {value: 'interior-painting-50€', id: '5', viewValue: 'Interior Painting'}
  ];
  customerDetailForm = this.formBuilder.group({
    street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    building: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    postCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    property: ['', [Validators.required]],
    size: ['', [Validators.required]],
    // experienceLevel: ['', [Validators.required]],
    // companySize: ['', [Validators.required]]
  });
  private property;
  selectedService;

  constructor(private cd: ChangeDetectorRef, public util: UtilService, public dataShare: DataShareService, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getService();
  }

  formatLabel(value: number): any {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }


  changeValue($event): void {
    console.log($event.value);
    this.dataShare.serviceValue = $event.value;
    this.setTempService($event.value);
    this.serviceExists = _.find(this.dataShare.order.services, {id: $event.value.id});
    this.dataShare.addFormVisible = true;
  }

  companySize($event): any {
    this.dataShare.companySize = $event.value;
  }

  addExperienceLevel($event): any {
    this.dataShare.experienceLevel = $event.value;
  }

  getMeterSq($event): any {
    console.log($event.value);
    this.size = $event.value;
    this.dataShare.order.customerDetails.propertySize = this.size;
  }


  getService(): any {
    this.api.getServices().subscribe(data => {
        // console.log(data);
        this.dataShare.apiService = data;
        if (this.url && this.url.length > 0){
          this.selectedService = _.find(data, {url: this.url});
          if (this.selectedService){
            this.dataShare.serviceValue = this.selectedService;
            this.setTempService(this.selectedService);
            this.dataShare.addFormVisible = true;
          }
        }
        console.log('This is service data::', this.dataShare.apiService);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  propertyType($event): void {
    this.property = $event.value;
    this.dataShare.order.propertyType = this.property;
  }

  moveNext(): void {
    if (!this.customerDetailForm.valid) {
      console.log('Form is not valid!');
      return;
    }
    // check if all data is valid
    this.dataShare.order.customerDetails = {
      propertyType: this.customerDetailForm.get('property').value,
      propertySize: this.customerDetailForm.get('size').value,
      street: this.customerDetailForm.get('street').value,
      postCode: this.customerDetailForm.get('postCode').value,
      city: this.customerDetailForm.get('city').value,
      building: this.customerDetailForm.get('building').value
      // experienceLevel: this.customerDetailForm.get('experienceLevel').value,
      // companySize: this.customerDetailForm.get('companySize').value
    };
    console.log('Customer Details', this.dataShare.order.customerDetails);
    this.dataShare.customerReady.next(true);
    this.dataShare.step.addService = true;
    this.dataShare.tabChange.next(1);
    // setTimeout(() => {
    //   this.dataShare.tabIndex = 1;
    //   this.cd.detectChanges();
    // }, 100);
  }

  // getPostCode(): void{
  //   const postCode = this.customerDetailForm.get('postCode').value;
  //   this.api.getPostCode(postCode).subscribe(data => {
  //     console.log(data);
  //   });
  // }
  onSearchChange(value): void {
    if (value.length === 5) {
      this.getPostCode(value);
    }
  }

  getPostCode(postCode): void {
    this.api.getPostCode(postCode).subscribe(data => {
      if (data.length > 0) {
        this.postcodeError = false;
        this.customerDetailForm.get('city').patchValue(this.util.titleCase(data[0].name));
      } else {
        this.postcodeError = true;
        this.customerDetailForm.get('city').setErrors({incorrect: true});
        this.util.presentSnackBar('It appears to be a invalid postcode!');
      }
    });
  }


  setTempService(service): void {
    console.log(service);
    this.dataShare.tempService = service;
    if (service.viewType === 1) {
      this.dataShare.tempService.roofAreaPrice = 0;
      this.dataShare.tempService.roofMaterialPrice = 0;
      this.dataShare.tempService.roofIncensionPrice = 0;

    } else if (service.viewType === 2) {
      this.dataShare.tempService.bathrooRenovation = 0;
      this.dataShare.tempService.noOfPointsPrice = 0;
      this.dataShare.tempService.oldStructurePrice = 0;
      this.dataShare.tempService.smoothingPrice = 0;
      this.dataShare.tempService.refurbishmentPrice = 0;

    } else if (service.viewType === 3) {
      this.dataShare.tempService.saunaRenovationPrice = 0;
      this.dataShare.tempService.newBenchesPrice = 0;
      this.dataShare.tempService.newStovePrice = 0;
      this.dataShare.tempService.newDoorPrice = 0;

    } else if (service.viewType === 4) {
      this.dataShare.tempService.areaPrice = 0;
      this.dataShare.tempService.baseJobPrice = 0;
      this.dataShare.tempService.sameColorPrice = 0;

    }
    this.dataShare.addFormVisible = true;
  }
}
