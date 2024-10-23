import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormBuilder, Validators } from '@angular/forms';
import {SessionService} from '../../services/session.service';
import {UtilService} from '../../services/util.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUp: any;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private session: SessionService,
              private util: UtilService, private route: Router) { }

  ngOnInit(): void {
    this.signUp  =  this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): any {
    const body = this.signUp.value;
    body.username = body.email;
    if (this.signUp.valid) {
      if (this.signUp.value.password === this.signUp.value.confirmPassword) {
        this.api.doSignUp(body).subscribe(  async user => {
          console.log('User SignUp Successful::', user);
          const account = await this.api.connectAccount(user.user._id).toPromise();
          console.log('Account Linked', account);
          await this.session.setToken(user.jwt);
          await this.session.setUser(account);
          await this.api.setToken();
          await this.route.navigateByUrl('/');
        }, error => {
          this.util.presentSnackBar('User Registration Failed');
        });
      } else {
        this.util.presentSnackBar('Password and conform password do not match');
      }

    } else {
      this.util.presentSnackBar('Please correct form errors');
    }
  }
}
