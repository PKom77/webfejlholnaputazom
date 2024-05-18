import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { PremiumUserService } from '../../shared/globals/PremiumUserService';
import { UserService } from '../../shared/globals/UserService';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Input() loggedInput: boolean = false;

  menuItemClicked(pageValue: string) {
    this.selectedPage.emit(pageValue);
  }

  constructor(public userService: UserService, public premiumUserService: PremiumUserService) { }
}
