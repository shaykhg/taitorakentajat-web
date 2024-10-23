import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddServiceComponent } from '../taito-services/add-services/add-service.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ServiceAddedComponent } from './service-added/service-added.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FloorRepairComponent} from './floor-repair/floor-repair.component';
import {PaintingComponent} from './painting/painting.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [FloorRepairComponent, AddServiceComponent, ServiceAddedComponent, PaintingComponent],
  exports: [
    AddServiceComponent,
    ServiceAddedComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatRadioModule,
    MatTooltipModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ]
})
export class TaitoServicesModule { }
