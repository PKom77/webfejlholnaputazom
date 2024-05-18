import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTicketsRoutingModule } from './my-tickets-routing.module';
import { MyTicketsComponent } from './my-tickets.component';


@NgModule({
  declarations: [MyTicketsComponent],
  imports: [
    CommonModule,
    MyTicketsRoutingModule
  ]
})
export class MyTicketsModule {
}
