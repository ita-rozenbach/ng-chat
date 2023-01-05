import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app';
import { merge } from 'rxjs';
import { User } from 'src/app/Models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) { }


  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider());
  }
  private authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      return this.setUserDate(res.user as User);
    })
  }

  private setUserDate(user: User): Promise<void> | void {
    //within the collection, there is documents, the ID of each document is the UID of the user
    //create the document
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    //the data for this document
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    //insert/update the data for the document
    return userRef.set(userData, {
      merge: true
    })



  }
}
