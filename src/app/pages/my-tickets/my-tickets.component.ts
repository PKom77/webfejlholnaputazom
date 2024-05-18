import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JegyService } from '../../shared/globals/JegyService';
import { PremiumUserService } from '../../shared/globals/PremiumUserService';
import { UserService } from '../../shared/globals/UserService';
import { Jegy } from '../../shared/Models/Jegy';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss'
})
export class MyTicketsComponent {
  jegyek: Jegy[] = [];

  constructor(private router: Router, private userService: UserService, public premiumUserService: PremiumUserService, private jegyService: JegyService) {
    if (!this.userService.loggedInUser.logged) {
      this.router.navigateByUrl('/not-found');
    } else {
      this.jegyService.find(this.userService.loggedInUser.email).subscribe(
        jegyek => {
          this.jegyek = jegyek;
        },
        error => {
          console.error('Hiba a jegyek lekérésekor:', error);
        }
      );
    }
  }
}
