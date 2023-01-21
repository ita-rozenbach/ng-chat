import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from 'src/app/Models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private IsLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // public isLoggedIn = this.IsLoggedIn$.asObservable();

  private userDetails$: Subject<User | undefined> = new Subject<User | undefined>();
  public userDetails = this.userDetails$.asObservable();

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router) {

      const u = localStorage.getItem("user");
      if (!!u) {
        this.IsLoggedIn$.next(true);
        // this.router.navigate(["/chat"]);
      }
    


    afAuth.authState.subscribe((user) => {
      if (!!user) {
        this.userDetails$.next(user as User);
        this.IsLoggedIn$.next(true);
        localStorage.setItem('user', JSON.stringify(user));
      }
      else {
        localStorage.removeItem('user');
        this.IsLoggedIn$.next(false);

      }
    })
  }


  public signInWithGoogle() {
    this.authLogin(new firebase.default.auth.GoogleAuthProvider());
    
  }

  public signOut(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigate(['/']);
      this.userDetails$.next(undefined);

    })
  }

  
  private authLogin(provider: firebase.default.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider).then((res) => {
      this.IsLoggedIn$.next(true);
      this.setUserDate(res.user as User);
      // this.router.navigate(["/chat"]);
      this.router.navigate(["chat"])
    })
  }

  private setUserDate(user: User): Promise<void> | void {
    //within the collection, there is documents, the ID of each document is the UID of the user
    //create the document
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    //insert/update the data within a document
    return userRef.set(userData, {
      merge: true
    })
  }

  public isLoggedIn(): Observable<boolean> {
    return this.IsLoggedIn$.asObservable();
  }

}
