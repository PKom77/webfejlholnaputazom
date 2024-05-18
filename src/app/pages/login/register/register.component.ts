import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/globals/UserService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth.service';
import { error } from 'node:console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordagain: new FormControl('', Validators.required),

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


  constructor(private router: Router, private userService: UserService, private _snackBar: MatSnackBar, private authService: AuthService) {
    if (this.userService.loggedInUser.logged) {
      this.router.navigateByUrl('/not-found');
    }
    this.openSnackBar("Regisztráció megkezdése", "OK");

  }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  unsuccess: boolean = false;

  register() {
    if (this.registerForm.valid) {
      this.userService.loggedInUser.email = this.registerForm.value.email || '';
      this.userService.loggedInUser.name = this.registerForm.value.name || '';
      this.userService.loggedInUser.city = this.registerForm.value.city || '';
      this.authService.signup(this.registerForm.value.email || '', this.registerForm.value.password || '').then(cred => {
        console.log(cred);
        this.userService.create().then(() => {
          console.log('User add OK');
          this.userService.loggedInUser.logged = true;
          this.router.navigateByUrl('/main');
        }).catch(error => {
          console.error(error);
          this.openSnackBar("Nem megfelelő az email formátuma!", "Bocsi");
        });
      }).catch(error => {
        console.error(error);
        this.openSnackBar("Nem megfelelő az email formátuma!", "Bocsi");
      });
    } else {
      this.unsuccess = true;
    }
  }
}
