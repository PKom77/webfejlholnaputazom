import { Renderer2 } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PremiumUserService } from '../../shared/globals/PremiumUserService';
import { UserService } from '../../shared/globals/UserService';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });
  constructor(private router: Router, public userService: UserService, private authService: AuthService, private _snackBar: MatSnackBar, public premiumUserService: PremiumUserService, private renderer: Renderer2) { }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email || '', this.loginForm.value.password || '').then(cred => {
        console.log(cred);
        this.userService.loggedInUser.email = this.loginForm.value.email || '';
        this.userService.loggedInUser.logged = true;
        this.userService.getUser().subscribe(users => {
          this.userService.loggedInUser.city = users[0].city;
          this.userService.loggedInUser.name = users[0].name;
        });
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error);
      });
    }
  }

  logout() {
    if (this.userService.loggedInUser.logged) {
      this.authService.logout();
      this.userService.loggedInUser.logged = false;
      this.userService.loggedInUser.city = '';
      this.userService.loggedInUser.email = '';
      this.userService.loggedInUser.name = '';
      this.router.navigateByUrl('/main');
      console.log("Sikeres kijelentkezés!")
      this.openSnackBar("Kijelentkezés megtörtént", "OK");
    }
  }

  deleteUser() {
    if (this.userService.loggedInUser.logged) {
      this.authService.logout();
      this.authService.deleteUser();
      this.userService.delete();
      this.userService.loggedInUser.logged = false;
      this.userService.loggedInUser.city = '';
      this.userService.loggedInUser.email = '';
      this.userService.loggedInUser.name = '';
      this.router.navigateByUrl('/main');
      console.log("Sikeres törlés!")
      this.openSnackBar("Törlés megtörtént", ":(");
    }

  }

  premiumUser() {
    this.premiumUserService.loggedInUser.email = this.userService.loggedInUser.email;
    this.premiumUserService.loggedInUser.name = this.userService.loggedInUser.name;
    if (this.premiumUserService.loggedInUser.isPremium) {
      this.premiumUserService.loggedInUser.isPremium = false;
    } else {
      this.premiumUserService.loggedInUser.isPremium = true;
    }
    this.updateBackgroundColor();
  }

  updateBackgroundColor() {
    const backgroundColor = this.premiumUserService.loggedInUser.isPremium ? 'gold !important' : 'rgb(150, 150, 150) !important';
    this.renderer.setStyle(document.documentElement, 'background-color', backgroundColor);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
