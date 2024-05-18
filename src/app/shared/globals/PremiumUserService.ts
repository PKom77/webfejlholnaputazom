import { Injectable } from '@angular/core';
import { PremiumUser } from '../Models/PremiumUser';

@Injectable({
  providedIn: 'root'
})
export class PremiumUserService {
  loggedInUser: PremiumUser = { email: '', name: '', isPremium: false };

  constructor() { }
}
