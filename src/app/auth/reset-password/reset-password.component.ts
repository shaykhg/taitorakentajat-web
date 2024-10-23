import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  reset = 0;
  progress = false;
  code = '';
  password = '';
  cnfPassword = '';

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params.code;
    });
  }

  changePassword(): void {
    this.progress = true;
    this.api.resetPassword(this.password, this.code).subscribe(data => {
      this.progress = false;
      this.reset = 1;
    }, error =>  {
      this.progress = false;
      this.reset = 2;
    });
  }
}
