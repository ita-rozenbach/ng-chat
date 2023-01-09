import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private authService: AuthService){}

   public signInWithGoogle(){
    this.authService.signInWithGoogle();
  }
  title = 'ng-chat';
}
