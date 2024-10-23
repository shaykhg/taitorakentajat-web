import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email = '';
  sent = 0;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  progress = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  sendLink(): void {
    this.progress = true;
    this.api.forgotPassword(this.email).subscribe(data => {
      this.progress = false;
      this.sent = 1;
    }, error => {
      this.progress = false;
      this.sent = 2;
    });
  }
}
