import {APP_INITIALIZER, enableProdMode, ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {OrderModule} from './order/order.module';
import { ScheduleComponent } from './schedule/schedule.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {OrderCreatedComponent} from './home/order-created/order-created.component';
import {HttpClientModule} from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MessageComponent } from './message/message.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BookingStatusComponent} from './booking-status/booking-success/booking-status.component';
import { CustomerTimeSlotComponent } from './schedule/customer-time-slot/customer-time-slot.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import {Router} from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { RatingComponent } from './rating/rating.component';
import {BarRatingModule} from 'ngx-bar-rating';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { PaintingComponent } from './taito-services/painting/painting.component';
import {TaitoServicesModule} from './taito-services/taito-services.module';
import { BookingFailedComponent } from './booking-status/booking-failed/booking-failed.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

Sentry.init({
  dsn: 'https://9adeb1fcd270478d9a79d9f496cc4872@o554931.ingest.sentry.io/5734324',
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ['localhost', 'https://yourserver.io/api'],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ScheduleComponent,
    OrderCreatedComponent,
    MessageComponent,
    BookingStatusComponent,
    CustomerTimeSlotComponent,
    OrderDetailsComponent,
    UserProfileComponent,
    MyOrdersComponent,
    NotFoundComponent,
    RatingComponent,
    BookingFailedComponent,
    ImageViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TaitoServicesModule,
    MatCardModule,
    MatExpansionModule,
    OrderModule,
    MatCheckboxModule,
    MatGridListModule,
    MatRippleModule,
    BarRatingModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatTabsModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ], exports: [
    HeaderComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log(`Bootstrap success`))
  .catch(err => console.error(err));

