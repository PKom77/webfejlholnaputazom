import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string): Promise<any>{
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.auth.signOut();
  }

  deleteUser() {
    this.auth.currentUser.then(user => {
      if (user) {
        user.delete().then(() => {
          console.log('User deleted successfully.');
        }).catch(error => {
          console.error('Error deleting user:', error);
        });
      } else {
        console.error('No user signed in.');
      }
    }).catch(error => {
      console.error('Error getting current user:', error);
    });
  }
}
