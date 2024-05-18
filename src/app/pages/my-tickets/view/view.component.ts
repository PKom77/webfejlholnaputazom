import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { __param } from 'tslib';
import { JegyService } from '../../../shared/globals/JegyService';
import { PremiumUserService } from '../../../shared/globals/PremiumUserService';
import { UserService } from '../../../shared/globals/UserService';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  ticketdata: string = "";
  splitted: string[] = [];
  mikor: string = "";
  honnan: string = "";
  hova: string = "";
  mennyi: string = "";
  ar: string = "";

  constructor(private actRoute: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, public userService: UserService, public premiumUserService: PremiumUserService, private jegyService: JegyService) {
    if (!this.userService.loggedInUser.logged) {
      this.router.navigateByUrl('/not-found');
    }
  }

  ngOnInit(): void {
    this.actRoute.params.subscribe((param: any) => { this.ticketdata = param.ticketdata as string; })
    this.splitted = this.ticketdata.split(',');
    this.mikor = this.splitted[0];
    this.honnan = this.splitted[1];
    this.hova = this.splitted[2];
    this.mennyi = this.splitted[3];
    this.ar = this.splitted[4];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  useTicket() {
    this.jegyService.loggedInUser.tulaj = this.userService.loggedInUser.email;
    this.jegyService.loggedInUser.darab = this.mennyi;
    this.jegyService.loggedInUser.ar = this.ar;
    this.jegyService.loggedInUser.honnan = this.honnan;
    this.jegyService.loggedInUser.hova = this.hova;
    this.jegyService.loggedInUser.indul = this.mikor;
    this.jegyService.useTicket();
    this.openSnackBar("Jegyed elfogadva, szállj fel a buszra és kezd meg az utat!", "Adios");
    this.router.navigateByUrl('/main');
  }
}
