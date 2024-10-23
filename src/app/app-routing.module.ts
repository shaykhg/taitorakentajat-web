import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookingStatusComponent} from './booking-status/booking-success/booking-status.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RatingComponent} from './rating/rating.component';
import {BookingFailedComponent} from './booking-status/booking-failed/booking-failed.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'service/:url',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'booking-status',
    component: BookingStatusComponent
  },
  {
    path: 'booking-status-failed',
    component: BookingFailedComponent
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'review/:booking/:user',
    component: RatingComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
