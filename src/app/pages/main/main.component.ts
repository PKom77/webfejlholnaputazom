import { Component } from '@angular/core';
import { PremiumUserService } from '../../shared/globals/PremiumUserService';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(public premiumUserService: PremiumUserService) {}
}
