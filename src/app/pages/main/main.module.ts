import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive'
import { SelectDirective } from './select.directive';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [MainComponent, HighlightDirective, SelectDirective],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatCardModule
  ]
})
export class MainModule { }
