import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IChatRoom, IMassege } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFirestore) {

  }

  public getRooms(): Observable<Array<IChatRoom>> {
    return this.db.collection('rooms').snapshotChanges().pipe(
      map((snaps) => {
        return snaps.map((snap) => {
          const id = snap.payload.doc.id;
          const data = snap.payload.doc.data() as IChatRoom;
          return {
            ...data,
            id
          }
        })
      })
    )
  }

  public getRoomMasseges(roomId: string): Observable<Array<IMassege>> {
    return this.db.collection('rooms').doc(roomId).collection('masseges')
      .snapshotChanges().pipe(
        map((messages) => {
          return messages.map((message) => {
            const id = message.payload.doc.id;
            const data = message.payload.doc.data();
            return {
              ...data,
              id
            } as IMassege
          })
        })
      )
  }


}
