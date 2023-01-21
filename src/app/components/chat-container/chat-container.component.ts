import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IChatRoom, IMassege } from 'src/app/Models';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnDestroy {

  private subscriptions: Subscription = new Subscription();

  public rooms$: Observable<Array<IChatRoom>>;
  public masseges$: Observable<Array<IMassege>>;
  

  constructor(private chatService: ChatService, private router: Router, private activatedRoute: ActivatedRoute) {
    const roomId: string = this.activatedRoute.snapshot.url[0].path;
    this.rooms$ = this.chatService.getRooms();
    this.masseges$ = chatService.getRoomMasseges(roomId);


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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
