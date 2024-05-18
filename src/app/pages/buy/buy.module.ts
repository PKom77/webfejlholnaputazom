import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this line if you use reactive forms

import { BuyRoutingModule } from './buy-routing.module';
import { BuyComponent } from './buy.component';
import { ValidDatePipe } from '../../shared/pipes/valid-date.pipe';

@NgModule({
  declarations: [
    BuyComponent,
    ValidDatePipe
  ],
  imports: [
    CommonModule,
    BuyRoutingModule,
    ReactiveFormsModule // Add this line if you use reactive forms
  ]
})
export class BuyModule {}
