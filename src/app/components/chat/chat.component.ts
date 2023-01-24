import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IMassege } from 'src/app/Models';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild("virtualScroll") virtualScroll?: CdkVirtualScrollViewport;
  
  @Output() onSendMassege: EventEmitter<string> = new EventEmitter();

  @Input() set masseges(masseges: Array<IMassege>) {
    this._masseges = masseges.sort((x, y) => { return x.timestamp - y.timestamp })
    this.virtualScroll?.scrollToIndex(this._masseges.length - 1);
  }
  get masseges() {
    return this._masseges;
  }
  private _masseges: Array<IMassege> = [];


  ngOnInit(): void {
    console.log("masseges ", this.masseges)
  }

  public sendMassege(massege: string, input: HTMLInputElement): void {
    this.onSendMassege.emit(massege);
    input.value = '';
  }
}
