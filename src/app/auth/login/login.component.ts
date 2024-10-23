import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {SessionService} from '../../services/session.service';
import {DataShareService} from '../../services/data-share.service';
import {UtilService} from '../../services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public userName;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router,
              private session: SessionService, private data: DataShareService, private util: UtilService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      identifier: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  onSubmit(): any {
    const body = this.loginForm.value;
    this.apiService.doLogin(body)
      .subscribe(async res => {
          console.log('Login Successfully!', res);
          try {
            if (res.user.role.name === 'Customer'){
              await this.session.setToken(res.jwt);
              await this.apiService.setToken();
              if (res.user.account){
                await this.session.setUser(res.user.account);
              } else {
                const account = await this.apiService.connectAccount(res.user._id).toPromise();
                await this.session.setUser(account);
              }
              this.router.navigate(['/']);
            } else {
              const text = res.user.role.name === 'Service' ? 'Service Application' : 'Mobile Application';
              await this.util.presentAlert('Login Failed', `You cannot login here, Please use ${text} to login.`);
            }
          } catch (e) {
            console.log('An error occurred post login!', e);
            this.util.presentSnackBar('An unknown error occurred!');
          }
        },
        error => {
          console.log(error);
          this.util.presentSnackBar('Login Failed! User Credential Is Incorrect');
        }
      );
  }
}
