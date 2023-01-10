import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IChatRoom } from 'src/app/Models';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent {

  public rooms$: Observable<Array<IChatRoom>>;

  constructor(private chatService: ChatService) {
    this.rooms$ = chatService.getRooms();
  }

}
