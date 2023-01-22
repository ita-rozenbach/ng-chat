import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IChatRoom, IMassege, User } from 'src/app/Models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { AddRoomComponent } from '../add-room/add-room.component';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  private userId: string = "";

  public rooms$: Observable<Array<IChatRoom>>;
  public masseges$?: Observable<Array<IMassege>>;


  constructor(private chatService: ChatService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService,
   public dialog: MatDialog) {
    this.rooms$ = this.chatService.getRooms();

    // const roomId: string = this.activatedRoute.snapshot.url[0].path;
    // this.masseges$ = chatService.getRoomMasseges(roomId);

    let roomId: string;
    if(this.activatedRoute.snapshot.url.length>1){
      roomId = this.activatedRoute.snapshot.url[1].path;
      this.masseges$ = chatService.getRoomMasseges(roomId);

    }

    this.subscriptions.add(
      this.router.events.pipe(
        filter((data) => data instanceof NavigationEnd)).subscribe((data) => {
          const routerEvent: RouterEvent = <RouterEvent>data;
          const urlArr = routerEvent.url.split('/');
          if (urlArr.length > 2) {
            this.masseges$ = chatService.getRoomMasseges(urlArr[2]);
          }
        })
    )
  }
  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.getUserData().pipe(
        filter((data) => data != undefined)
      ).subscribe((user) => this.userId = user?.uid?user?.uid: "")
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openAddRoomModal() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result ", result)
      this.onAddRoom(result, this.userId)
    });
  }

  public onAddRoom(roomName: string, userId: string){
    this.chatService.addRoom(roomName, userId);
  }
}
