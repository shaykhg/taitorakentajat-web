import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SessionService} from '../services/session.service';
import {ApiService} from '../services/api.service';
import {UtilService} from '../services/util.service';
import {Router} from '@angular/router';
import {AppConstants} from '../AppConstants';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileForm = this.fb.group({
    name: ['', [Validators.required]],
    lname: ['', []],
    phone: ['', [Validators.required]],
    city: ['', [Validators.required]],
    email: ['', [Validators.required]],
  });

  constructor(private router: Router, private util: UtilService, private api: ApiService, private fb: FormBuilder, public session: SessionService) { }

        profileUpdating = false;
  currentTab = 1;
  BASE_URL = AppConstants.BASE_URL;

  ngOnInit(): void {
    this.refreshProfile();
    this.addUserDetailForm();
    if (!this.session.isLoggedIn){
      this.router.navigateByUrl('/auth/login');
    }
  }

  refreshProfile(): void {
    this.api.getMyProfile(this.session.getUser().id).subscribe(user => {
      this.session.setUser(user);
    });
  }

  addUserDetailForm(): any{
    console.log(this.session.getUser());
    this.userProfileForm.patchValue({
      name: this.session.getUser().name || '',
      lname: this.session.getUser().lname || '',
      phone: this.session.getUser().phone || '',
      city: this.session.getUser().city || '',
      email: this.session.getUser().email || ''
    });
  }

  updateUserInfo(): void{
    this.profileUpdating = true;
    const body = this.userProfileForm.value;
    // body.role = 'user';
    this.api.updateProfile(body, this.session.getUser()._id).subscribe(data => {
      console.log('Profile', data);
      this.session.setUser(data);
      this.profileUpdating = false;
      this.util.presentSnackBar('Profile updated successfully!');
    }, error => {
      this.profileUpdating = false;
      this.util.presentSnackBar('Unable to update profile currently!');
    });
  }

  async logoutConfirm(): Promise<void> {
    const confirm = await this.util.presentAlert('Logout', 'Are you sure you want to logout?', 'No', 'Yes');
    console.log(confirm);
    if (confirm.action === 1){
      this.session.logout();
      await this.util.presentSnackBar('You have been logged out successfully!');
    }
  }
}
