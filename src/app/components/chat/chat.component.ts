import { Component, Input, OnInit } from '@angular/core';
import { IMassege } from 'src/app/Models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() masseges: Array<IMassege> = [];

  ngOnInit(): void {
    console.log("masseges ", this.masseges)
  }
}
