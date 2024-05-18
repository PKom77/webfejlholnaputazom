import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: User = { email: '', name: '', city: '', logged: false };

  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  create() {
    return this.afs.collection<User>(this.collectionName).add(this.loggedInUser);
  }

  getUser() {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('email', '==', this.loggedInUser.email))
      .valueChanges({ idField: 'id' });
  }

  update() {
    this.afs.collection<User>(this.collectionName, ref => ref.where('email', '==', this.loggedInUser.email))
      .get()
      .subscribe(snapshot => {
        snapshot.forEach(doc => {
          const id = doc.id;
          this.afs.collection<User>(this.collectionName).doc(id).update({ logged: this.loggedInUser.logged })
            .then(() => console.log(`Updated logged for user with email ${this.loggedInUser.email}`))
            .catch(error => console.error(`Failed to update logged for user with email ${this.loggedInUser.email}:`, error));
        });
      });
  }

  delete() {
    this.afs.collection<User>(this.collectionName, ref => ref.where('email', '==', this.loggedInUser.email))
      .get()
      .subscribe(snapshot => {
        snapshot.forEach(doc => {
          const id = doc.id;
          this.afs.collection<User>(this.collectionName).doc(id).delete()
            .then(() => console.log(`User with email ${this.loggedInUser.email} successfully deleted`))
            .catch(error => console.error(`Failed to delete user with email ${this.loggedInUser.email}:`, error));
        });
      });
  }
}
