import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Jegy } from '../Models/Jegy';

@Injectable({
  providedIn: 'root'
})
export class JegyService {
  loggedInUser: Jegy = {tulaj: '', indul: '', honnan: '', hova: '',darab: '' ,ar: '' };

  constructor(private afs: AngularFirestore) { }

  add() {
    return this.afs.collection<Jegy>('Jegyek').add(this.loggedInUser);
  }

  find(tulaj: string) {
    return this.afs.collection<Jegy>('Jegyek', ref => ref.where('tulaj', '==', tulaj)).valueChanges({ idField: 'id' });
  }

  useTicket(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.afs.collection<Jegy>('Jegyek', ref =>
        ref.where('tulaj', '==', this.loggedInUser.tulaj)
          .where('ar', '==', this.loggedInUser.ar)
          .where('honnan', '==', this.loggedInUser.honnan)
          .where('hova', '==', this.loggedInUser.hova)
          .where('indul', '==', this.loggedInUser.indul)
          .limit(1)
      ).get().subscribe(snapshot => {
        snapshot.docs.forEach(doc => {
          doc.ref.delete().then(() => {
            console.log('A jegy sikeresen felhasználva és törölve.');
            resolve();
          }).catch(error => {
            console.error('Hiba a jegy törlésekor:', error);
            reject(error);
          });
        });
      }, error => {
        console.error('Hiba a jegy keresésekor:', error);
        reject(error);
      });
    });
  }
}
