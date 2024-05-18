import { Injectable } from '@angular/core';
import { Jarat } from '../Models/Jarat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JaratService {
  loggedInUser: Jarat = {indul: '', honnan: '', hova: '', helyek: '', ar: '' };

  constructor(private afs: AngularFirestore) { }

  get(honnan: string, hova: string): Observable<Jarat[]> {
    return this.afs.collection<Jarat>('Jaratok', ref => ref.where('honnan', '==', honnan).where('hova', '==', hova))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Jarat;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  update(honnan: string, hova: string, ar: string, darab: number): void {
    this.afs.collection<Jarat>('Jaratok', ref => ref.where('honnan', '==', honnan).where('hova', '==', hova).where('helyek', '==', ar))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Jarat;
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        take(1) // Csak az első elemet használjuk
      ).subscribe(jaratok => {
        if (jaratok.length > 0) {
          const firstJarat = jaratok[0];
          const currentAr = parseInt(firstJarat.ar);
          if (currentAr >= darab) {
            const newAr = currentAr - darab;
            this.afs.collection('Jaratok').doc(firstJarat.id).update({ ar: newAr.toString() })
              .then(() => console.log(`Updated ar for ${firstJarat.id}`))
              .catch(err => console.error(`Failed to update ar for ${firstJarat.id}`, err));
          } else {
            console.warn(`Cannot update ar for ${firstJarat.id}, darab is greater than current ar.`);
          }
        } else {
          console.warn('No matching documents found.');
        }
      });
  }
}
