import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public IsLoggedIn$: Observable<boolean>;
  constructor(private authServise: AuthService) {
    this.IsLoggedIn$ = authServise.isLoggedIn;
  }

  public signInWithGoogle(): void {
    this.authServise.signInWithGoogle();
  }

  public signOut(): void {
    this.authServise.signOut();
  }
}
