import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../globals/UserService';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  if (userService.loggedInUser.logged) {
    return true;
  } else {
    return false;
  }

};
