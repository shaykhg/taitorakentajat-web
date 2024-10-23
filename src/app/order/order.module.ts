import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages/packages.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { PlaceOrderComponent } from './place-order/place-order.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ProductComponent } from './product/product.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
    declarations: [PackagesComponent, PlaceOrderComponent, ProductComponent],
    exports: [
        PackagesComponent,
        PlaceOrderComponent
    ],
    imports: [
        CommonModule,
        MatRadioModule,
        MatTabsModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSliderModule,
        MatTooltipModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatStepperModule,
        MatSelectModule,
        FormsModule
    ]
})
export class OrderModule { }
