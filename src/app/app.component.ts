import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/globals/UserService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Holnap-Utazom';
  page = 'main';

  constructor(private router: Router, public userService: UserService) {
  }

  changePage(selectedPage: string) {
    if (!this.userService.loggedInUser.logged && selectedPage != "main") {
      this.page = "login";
      this.router.navigateByUrl(this.page);
    }
    else {
      this.page = selectedPage;
      this.router.navigateByUrl(this.page);
    }
  }
}

