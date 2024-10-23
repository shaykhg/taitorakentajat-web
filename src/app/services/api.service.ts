import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from './session.service';
import {Observable} from 'rxjs';
import {AppConstants} from '../AppConstants';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private headers;

  constructor(private http: HttpClient, private session: SessionService) {
    // if user is logged in it will set headers automatically to headers variable
    // it also observe the changes so it will automatically handle everything
    this.session.auth.subscribe(data => {
      if (data){
        this.headers = { Authorization: `Bearer ${session.getToken()}`};
      } else {
        this.headers = {};
      }
    });
  }

  public setToken(): void {
    this.headers = { Authorization: `Bearer ${this.session.getToken()}`};
  }

  doLogin(body): Observable<any>{
    return this.http.post(AppConstants.API.LOGIN, body);
  }

  connectAccount(userId, role?): Observable<any>{
    return this.http.patch(AppConstants.API.PATCH_ACCOUNT + userId, role ? {role} :  {});
  }

  doSignUp(body): Observable<any>{
    return this.http.post(AppConstants.API.REGISTER, body);
  }

  updateProfile(body, accId): Observable<any>{
    return this.http.patch(AppConstants.API.UPDATE_PROFILE + accId, body, {headers: this.headers});
  }

  getBookings(): Observable<any>{
    return this.http.get(AppConstants.API.BOOKINGS, {headers: this.headers});
  }

  getServices(): any{
    return this.http.get(AppConstants.API.SERVICES + '?enable=true');
  }

  getPackages(serviceId, key): any{
    if (key){
      return this.http.get(AppConstants.API.PACKAGES + '?enable=true&service=' + serviceId + '&key=' + key);
    } else {
      return this.http.get(AppConstants.API.PACKAGES + '?enable=true&service=' + serviceId);
    }
  }

  getProduct(productId): any{
    return this.http.get(AppConstants.API.PRODUCT + productId);
  }

  getSlots(city): any{
    const date = moment().startOf('day').toISOString();
    return this.http.get(AppConstants.API.SLOTS + `?available=true&city=${city.toLowerCase()}&date_gt=${date}`);
  }

  placeBooking(body): any{
    return this.http.post(AppConstants.API.PLACE_BOOKING, body);
  }

  uploadImage(body: FormData): Observable<any>{
    return this.http.post(AppConstants.API.UPLOAD_IMAGES, body);
  }

  getPostCode(postCode): Observable<any>{
    return this.http.get(AppConstants.API.POSTCODE + `?postcode=${postCode}`);
  }
  getMyBookings(): Observable<any>{
    return this.http.get(AppConstants.API.MY_BOOKINGS, {headers: this.headers});
  }

  getBookingDetails(id: string): Observable<any> {
    return this.http.get(AppConstants.API.BOOKINGS + '/' + id, {headers: this.headers});
  }

  getMyProfile(id): Observable<any>{
    return this.http.get(AppConstants.API.ACCOUNTS + id, {headers: this.headers});
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(AppConstants.API.FORGOT_PASSWORD, {email});
  }

  resetPassword(password: string, code: string): Observable<any> {
    return this.http.post<any>(AppConstants.API.RESET_PASSWORD, {password, code, passwordConfirmation: password});
  }

  postReview(body): Observable<any>{
    return this.http.post<any>(AppConstants.API.POST_REVIEW, body);
  }

  checkExistingReview(id): Observable<any>{
    return this.http.get<any>(AppConstants.API.REVIEW_EXIST + '/' + id);
  }
}
