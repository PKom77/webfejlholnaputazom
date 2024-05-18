import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JaratService } from '../../shared/globals/JaratService';
import { PremiumUserService } from '../../shared/globals/PremiumUserService';
import { UserService } from '../../shared/globals/UserService';
import { Jarat } from '../../shared/Models/Jarat';
import { timer } from 'rxjs';
import { JegyService } from '../../shared/globals/JegyService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent {
  date: string;

  buyForm = new FormGroup({
    honnan: new FormControl('', Validators.required),
    hova: new FormControl('', Validators.required),
    db: new FormControl('', Validators.required)

  });

  options: any[] = [
    'Budapest',
    'Békéscsaba',
    'Cegléd',
    'Dunaújváros',
    'Eger',
    'Győr',
    'Kaposvár',
    'Kecskemét',
    'Komárom',
    'Miskolc',
    'Nagykanizsa',
    'Nyíregyháza',
    'Pécs',
    'Siófok',
    'Sopron',
    'Szeged',
    'Székesfehérvár',
    'Szolnok',
    'Szombathely',
    'Tatabánya',
    'Zalaegerszeg'
  ];

  jaratok: Jarat[] = [];


  unsuccess: boolean = false;
  showable = false;

  constructor(private router: Router, private userService: UserService, public premiumUserService: PremiumUserService, private afs: AngularFirestore, private jaratService: JaratService, private jegyService: JegyService, private _snackBar: MatSnackBar) {
    if (!this.userService.loggedInUser.logged) {
      this.router.navigateByUrl('/not-found');
    }

    this.date = 'datum';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  search() {
    if (this.buyForm.valid) {
      this.unsuccess = false;
      this.jaratService.get(this.buyForm.value.honnan || '', this.buyForm.value.hova || '').subscribe(data => {
        this.jaratok = data;
      });
      this.showable = true;
    } else {
      this.unsuccess = true;
    }
  }

  buy(jarat: Jarat) {
    const sleepTime = 1000;
    timer(sleepTime).subscribe(() => {
      this.jaratService.update(jarat.honnan, jarat.hova, jarat.helyek, Number(this.buyForm.value.db || 0))
      this.jegyService.loggedInUser.darab = this.buyForm.value.db || '';
      this.jegyService.loggedInUser.ar = (Number(jarat.helyek) * (Number(this.buyForm.value.db) || 0)).toString();
      this.jegyService.loggedInUser.honnan = jarat.honnan;
      this.jegyService.loggedInUser.hova = jarat.hova;
      this.jegyService.loggedInUser.indul = jarat.indul;
      this.jegyService.loggedInUser.tulaj = this.userService.loggedInUser.email;
      this.jegyService.add();
      this.router.navigateByUrl('/tickets');
      this.openSnackBar("Sikeres jegyvásárlás", "JEE");
    });
  }
}
