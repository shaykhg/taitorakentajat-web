import { Component, OnInit } from '@angular/core';
import {DataShareService} from '../../services/data-share.service';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {UtilService} from '../../services/util.service';
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  ImageToUpload: File = null;
  imageUrl = {
    one: '',
    two: '',
    three: '',
    four: '',
  };

  imageFile = {
    one: '',
    two: '',
    three: '',
    four: '',
  };

  uploadForm = new FormData();


  placeOrder = this.formBuilder.group({
    fname: ['', [Validators.required]],
    lname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    notes: ['', [Validators.max(250)]],
    termAccept: ['', [Validators.required]],
    cancellation: ['', [Validators.required]]
  });
  public termAndCondition: boolean;
  public policy: any;
  private addImage = false;


  constructor(private session: SessionService, private api: ApiService, public data: DataShareService,
              private formBuilder: FormBuilder, private route: Router, private utils: UtilService) { }

  ngOnInit(): void {
    // this.postOrder();
    console.log(this.data.slotId);
    console.log('TIme', this.data.slot);
    console.log('Form', this.data.order.scheduleContactForm);
    if (this.session.isLoggedIn) {
      this.placeOrder.get('email').setValue(this.session.getUser().email);
    }
  }

  get f(): any {
    return this.placeOrder.controls;
  }


  getProductImg(files: FileList): any{
    // console.log($event.target.files);


    this.ImageToUpload = files.item(0);
    console.log('Image DATA', files.item(0));

  }

  onFileChange(event, which): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (mFile) => {

        this.imageUrl[which] = reader.result as string;
        this.imageFile[which] = file;
        this.uploadForm.append('files', file);
        this.addImage = true;

      };

    }
  }
  removeImage(img): any {
    this.imageUrl[img] = '';
    this.imageFile[img] = null;
    this.uploadForm = new FormData();
    for (const key of Object.keys(this.imageFile)){
      if (key){
        this.uploadForm.append('files', this.imageFile[key]);
      }
    }
  }

  imageUpload(): void {
    // show progress
    if (this.addImage) {
      this.data.loading = true;
      console.log('this is upload form', this.uploadForm);
      this.api.uploadImage(this.uploadForm).subscribe( res => {
        console.log('Response Of Image Upload::', res);
        this.data.order.images = res;
        this.postOrder();
      }, error => {
        this.data.loading = false;
        this.utils.presentSnackBar('Error While Uploading Images!');
      });
    } else {
      this.postOrder();
    }

  }

  postOrder(): void{
    const body: any = {
      propertyType: this.data.order.customerDetails.propertyType, // Type of property
      propertySize: this.data.order.customerDetails.propertySize.toString(), // Size of property
      building: this.data.order.customerDetails.street, // Street and Building address
      buildingYear: this.data.order.customerDetails.building, // Street and Building address
      postcode: this.data.order.customerDetails.postCode, // Postcode
      total: this.data.order.totalPrice, // Total
      status: 'PENDING', // Total
      city: this.data.order.customerDetails.city, // City of customer
      // experience: this.data.order.customerDetails.experienceLevel, // Experience needed for work
      // companySize: this.data.order.customerDetails.companySize, // Size of company
      packages: this.data.order.packages, // Packages choosed by customer
      images: this.data.order.images, // Images of propertycontactPhone
      buySelf: this.data.order.productHandle.buySelf, // Customer Will buy self
      assist: this.data.order.productHandle.assist, // New assistance to buy products
      notes: this.placeOrder.get('notes').value, // notes
      fname: this.placeOrder.get('fname').value, // First Name
      lname: this.placeOrder.get('lname').value, // Last Name
      email: this.placeOrder.get('email').value, // Email Customer
      phone: this.placeOrder.get('phone').value, // Phone Customer
      services: this.data.order.services, // Choosen Services Array in JSON
      timeNotFound: this.data.order.timeNotFound, // If customer do not found time
    };

    if (this.session.isLoggedIn){
      body.user = this.session.getUser().id;
    }

    if (this.data.renovationTime){
      body.renovation = this.data.contactDate.toISOString(); // Date when renovation starts
      // body.renovation = this.utils.noTimeISOString(body.renovation);
    }

    if (this.data.slotId){
      body.slot = this.data.slotId; // Slot object
      body.serviceMan = this.data.serviceMan; // ServiceMan Account
      body.date = this.data.slot.start; // Date when customer wants to see service man
    }
    if (body.timeNotFound) {
      body.contactEmail = this.data.order.scheduleContactForm.email; // Email where user wants to be contacted when they arrive
      body.contactPhone = this.data.order.scheduleContactForm.phone.toString(); // Phone when user want to be contacted when serviceMan arrives
      const date: Date = this.data.order.scheduleContactForm.date;
      date.setHours(+this.data.order.scheduleContactForm.time.split(':')[0]);
      date.setMinutes(+this.data.order.scheduleContactForm.time.split(':')[1]);
      body.date = date.toISOString(); // Date when customer wants to see service man
    }

    console.log('Form Submitted::', body);
    this.api.placeBooking(body).subscribe(data => {
      this.data.loading = false;
      console.log('Order placed successfully@');
      this.data.order = data;
      this.route.navigateByUrl('/booking-status');
    }, async error => {
      this.data.loading = false;
      await this.utils.presentAlert('Booking Failed', 'Hi, there is an error occured while placing your order request!');
      console.log('An error occurred while placing booking!', error);
    });
  }

  getTermAccept($event): any {
    this.termAndCondition = $event.checked;
  }

  getPolicy($event): any {
    this.policy = $event.checked;
  }


}
